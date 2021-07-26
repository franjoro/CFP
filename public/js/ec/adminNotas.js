$("#year").val(new Date().getFullYear());
$("#mes").val(new Date().getMonth());

const showEmptyMessage = (status = false) => {
  if (status) { $("#contenedor").addClass('d-none'); return $("#emptyAlert").removeClass('d-none'); }
  if (!status) return $("#emptyAlert").addClass('d-none');
};




const fillHtml = (data) => {
  showEmptyMessage();
  $("#contenedor").html('').removeClass('d-none');
  for (const property in data) {
    let htmlText = ` <div class="card shadow mb-4"> <div class="card-header py-3"> <h6 class="m-0 font-weight-bold text-primary">Actividades para el grupo con código: ${property} </h6></div>
    <div class="card-body table-responsive"> <table class="table" id="tabla${property}"><thead><tr>
                    <th>Módulo</th>
                    <th>Unidad evaluada</th>
                    <th>Tipo de evaluación</th>
                    <th>Descripción</th>
                    <th>Profesor</th>
                    <th>Notas</th>
                    <th>Contenidos</th>
                    <th>Reporte</th>
    </tr></thead><tbody>`;
    
    data[property].forEach((elementT) => {
      htmlText += `
      <tr><td> ${elementT.NombreModulo}</td>
      <td> ${elementT.NombreUnidad}</td>
      <td> ${elementT.Tipo}</td>
      <td> ${elementT.Descripcion}</td>
      <td> ${elementT.Profesor}</td>
      <td> <a class="btn btn-primary btn-block" target="_blank" href="/admin/ec/getNotasAdmin/${elementT.idEvaluacion}/${property}" > <i class="fas fa-book"></i> </a> </td>
      <td> <a class="btn btn-info btn-block" target="_blank" href="/admin/ec/getContenidosAdmin/${elementT.idEvaluacion}/${property}" > <i class="fas fa-bookmark"></i> </a> </td>
      <td> <button type="button" onclick="NotasContenidosFunction()" class="btn btn-success btn-block" target="_blank"> <i class="fas fa-file-excel"></i> </button> </td></tr>
      `;
    });
    htmlText += `</tbody></table></div></div>`;
    $("#contenedor").append(htmlText);
    $(`#tabla${property}`).DataTable();
  }
};


$("#btnVerNotas").click(async () => {
  const year = $("#year").val(), mes = $("#mes").val(), data = await $.ajax({ type: "GET", url: `/admin/ec/filter/${year}/${mes}` });
  if ($.isEmptyObject(data)) { showEmptyMessage(true); } else { showEmptyMessage(false); fillHtml(data); }
});


const getCheckedContenidos = ()=>{
  const arrContenidos = [];
  $(".switch").each(function ( element){
    const {id} = $(this).data();
    const {status} = $(this).data();
    const isCheck= $(this).is(':checked');
    const obj = {id,isCheck, status};
    arrContenidos.push(obj);
  });
  return arrContenidos;
};

$("#btnSave").click( async ()=>{
  const data = getCheckedContenidos();
  const idEvaluacion = $("#idEvaluacion").val();
  const query = await  $.ajax({
    type: "POST",
    url: "/admin/ec/contenidos",
    data: {contenido : JSON.stringify(data) , idEvaluacion}
  });
  if(query.status) {
    Swal.fire(
      '¡Perfecto!',
      'Contenidos actualizados correctamente',
      'success'
    );
  }
});

const  NotasContenidosFunction = async ()=>{
  const data = await $.ajax({
    url: "/reportes/NotasContenidos",
  });
  Swal.close();
  if(data.status) window.open("/reportes/download");
  console.log(data);
};
