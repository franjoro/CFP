const Directivas = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.jsdelivr.net",
            "https://code.jquery.com",
            "https://cdnjs.cloudflare.com",
            "https://cdn.datatables.net",
            "https://www.googletagmanager.com",
            "https://cdn.tiny.cloud"
        ],
        connectSrc: ["'self'", "https://api.salud.gob.sv", "https://www.google-analytics.com"],
        styleSrc: [
            "'self'",
            "fonts.googleapis.com",
            "'unsafe-inline'",
            "http://code.jquery.com",
            "https://cdnjs.cloudflare.com",
            "https://cdn.datatables.net",
            "https://cdn.jsdelivr.net"   ,
            "https://cdn.tiny.cloud"         
        ],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        imgSrc: [
            "'self'",
            "http://www.w3.org/2000/svg",
            "https://maps.gstatic.com",
            "https://maps.googleapis.com",
            "http://code.jquery.com",
            "https://sp.tinymce.com/",
            "https://cfppruebas.s3.us-east-2.amazonaws.com/"
        ],
        frameSrc: ["'self'", "https://www.google.com"],
    },
};

module.exports = Directivas;
