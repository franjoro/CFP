const SeeS3File = async (key, id) => {
    try {
      loaderFile();
      const query = await $.ajax({
        url: "/public/getFiles",
        type: "POST",
        data: { key },
      });
      let html ;
      if (query.status) {
        //  const html = ` <iframe src="https://cfp.ricaldone.edu.sv/public/seefile/${
        //    query.ext
        //  }?date=${Date.now()}" width="100%" height="100%"></iframe>`;
        // if(query.ext == 'pdf'){
        //   html = ` <iframe src="http://localhost:8080/public/seefile/${query.ext}?date=${Date.now()}" width="100%" height="100%">
        //   </iframe>`;
        // }else{
        //   html = `<img src="http://localhost:8080/public/seefile/${query.ext}?date=${Date.now()}" alt="" class="img-fluid"
        //   width="500px" height="500x"
        //   >`
        // }
        if(query.ext == 'pdf'){
          html = ` <iframe src="http://localhost:8080/public/seefile/${query.ext}?date=${Date.now()}" width="100%" height="100%">
          </iframe>`;
        }else{
          html = `<img src="http://localhost:8080/public/seefile/${query.ext}?date=${Date.now()}" alt="" class="img-fluid"
          width="500px" height="500x"
          >`
        }
  
        $("#framediv").css("height", "1200px");
        $("#framediv").html(html);
        // $("#framediv").html(html1);
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
    } catch (error) {
      console.log(error);
    }
  };
  