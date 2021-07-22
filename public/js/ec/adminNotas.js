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
      <td> <a class="btn btn-success btn-block" target="_blank" href="/admin/ec/getNotasAdmin/${elementT.idEvaluacion}/${property}" > <i class="fas fa-file-excel"></i> </a> </td></tr>
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