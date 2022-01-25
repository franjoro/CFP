// downloar files in aws
const DowloadS3File = async (key, name) => {
    try {
      loaderFile();
      const query = await $.ajax({
        url: "/public/getFiles",
        type: "POST",
        data: { key },
      });
      if (query.status) {
        window.open(`/public/archivo/${query.ext}?Name=${name}`);
        Swal.close();
      }
    } catch (error) {}
  };

// see documents in aws
let globalTrSeleccionado = null;
const SeeS3File = async (key, id) => {
  try {
    loaderFile();
    const query = await $.ajax({
      url: "/public/getFiles",
      type: "POST",
      data: { key },
    });
    if (query.status) {
      console.log(query);
      // const html = ` <iframe src="https://cfp.ricaldone.edu.sv/public/seefile/${
      //   query.ext
      // }?date=${Date.now()}" width="100%" height="100%"></iframe>`;
      const html = ` <iframe src="http://localhost:8080/public/seefile/${query.ext}?date=${Date.now()}" width="100%" height="100%"></iframe>`;
      $("#framediv").css("height", "1200px");
      $("#framediv").html(html);
      $("html, body").animate(
        {
          scrollTop: $("#framediv").offset().top,
        },
        500
      );
      Swal.close();
      $(`#${globalTrSeleccionado}`).removeClass("actives");
      $(`#${id}`).addClass("actives");
      globalTrSeleccionado = id;
    }
  } catch (error) {}
};