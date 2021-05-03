const quill = new Quill("#editor", {
    theme: "snow",
    placeholder: "Describa los contenidos que se veran en el curso",
  });


$( "#form" ).submit(function( event ) {
    event.preventDefault();
    const html = quill.root.innerHTML;
    $("#contenidos").val(html);
    const t = $(this).serialize();
    // console.log(t);
    console.log( $("#contenidos").val());
});