$("#id_course").select2({
    width: "100%",
    ajax: {
        url: "/contratos/read-courses",
        type: "post",
        dataType: "json",
        delay: 250,
        data(params) {
        return {
            searchTerm: params.term, // search term
        };
        },
        results(response) {
            $.map(response, (item) => ({
                id: item.id ,
                text: item.text,
            }));
        },
        cache: true,
    },
});

$("#id_presbyters").select2({
    width: "100%",
    ajax: {
        url: "/contratos/read-presbyter",
        type: "post",
        dataType: "json",
        delay: 250,
        data(params) {
        return {
            searchTerm: params.term, // search term
        };
        },
        results(response) {
            $.map(response, (item) => ({
                id: item.id ,
                text: item.text,
            }));
        },
        cache: true,
    },
});