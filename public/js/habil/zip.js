const createZipCourse = async (course) => {
    try {
      loader();
      const create = await $.ajax({
        url: `/admin/habil/saveZipCourse`,
        type: "POST",
        data: { course },
      });
      if (create.status) {
        window.open(`/admin/habil/fileZipCourse/zip`);
        Swal.close();
      }else{
          console.log(create.error);
      }
    } catch (error) {
      console.log(error);
      errorMessage();
    }
  };