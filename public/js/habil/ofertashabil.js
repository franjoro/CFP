const errorMessage = (e) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No se pudo realizar la operación" + e,
  });
};

const loader = () => {
  Swal.fire({
    title: "Por favor, Espere",
    html: "Cargando Data",
    allowOutsideClick: !1,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

tinymce.init({
  selector: "#mytextarea",
  id: "#mytextarea",
  plugins:
    " advcode casechange   autolink lists checklist media mediaembed   powerpaste table advtable  ",
  toolbar:
    "a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table",
  toolbar_mode: "floating",
  tinycomments_mode: "embedded",
  tinycomments_author: "Author name",
  setup: function (editor) {
    editor.on("init", function (e) {
      editor.setContent(`<table style="border-collapse: collapse; width: 100%; height: 63px;" border="1"><tbody>
      <tr style="height: 21px;"><td style="width: 28.7493%; height: 21px;"><strong>Contenido 1</strong></td><td style="width: 67.522%; height: 21px;">&nbsp;</td></tr><tr style="height: 21px;"><td style="width: 28.7493%; height: 21px;"><strong>Contenido 2</strong></td><td style="width: 67.522%; height: 21px;">&nbsp;</td></tr>
      <tr style="height: 21px;"><td style="width: 28.7493%; height: 21px;"><strong>Contenido 3</strong></td>
      <td style="width: 67.522%; height: 21px;">&nbsp;</td></tr></tbody></table>`);
    });
  },
});

$("#inicio").datepicker({
  dateFormat: "dd-mm-yy",
});
$("#fin").datepicker({
  dateFormat: "dd-mm-yy",
});
$("#costo").mask("000,000,000,000,000.00", {
  reverse: true,
});

$("#form").submit(async function (event) {
  tinyMCE.triggerSave();
  event.preventDefault();
  const t = $(this).serialize();
  const fd = new FormData();
  const file = $("#file")[0].files;
  const nombre = $("#nombre").val();
  const inicio = $("#inicio").val();
  const fin = $("#fin").val();
  const horarios = $("#horarios").val();
  const costo = $("#costo").val();
  const descripcion = $("#descripcion").val();
  const requisitos = $("#requisitos").val();
  const mytextarea = $("#mytextarea").val();
  const programa = $("#programa").val();

  fd.append("file", file[0]);
  fd.append("nombre", nombre);
  fd.append("inicio", inicio);
  fd.append("fin", fin);
  fd.append("horarios", horarios);
  fd.append("costo", costo);
  fd.append("descripcion", descripcion);
  fd.append("requisitos", requisitos);
  fd.append("mytextarea", mytextarea.trim());
  fd.append("codigo", new Date().getTime());
  fd.append("programa", programa);

  try {
    loader();
    const data = await $.ajax({
      url: "/admin/cursos/OfertaNoCotizante",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
    });
    window.history.back();
  } catch (e) {
    errorMessage();
  }
});
