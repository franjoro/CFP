/*@author: Osmaro Bonilla
  @description: Recolectar el link de
  @date: 18/08/2021
  @*/
//Variables globales
let global_linkToShare;
let global_linkDocuments;
/*@description: Crea un enlace para compartir la ruta del formulario
  @params: curso
  @date: 18/08/2021
  @*/
const GetLinkToShare = (curso) => {
  let link = `https://${document.domain}/habil/${curso}`;
  $("#link").val(link);
  global_linkToShare = link;
  return;
};

const GetLinkToShareDocuments = (idSolicitud, documento) =>{
  let link = `https://${document.domain}/habil/documentacion/habil/${idSolicitud}/documento/${documento}`;
  $("#link_document").val(link);
  global_linkDocuments = link;
  return;
}