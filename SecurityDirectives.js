const Directivas = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.jsdelivr.net/npm/sweetalert2@10",
            "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js",
            "https://code.jquery.com/ui/1.12.1/jquery-ui.js",
            "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js",
            "https://code.jquery.com/jquery-3.5.1.js",
            "http://cdnjs.cloudflare.com/ajax/libs/validate.js/0.13.1/validate.min.js",
            "https://cdn.datatables.net/v/bs4/dt-1.10.23/datatables.min.js",
            "https://cdn.jsdelivr.net/npm/bs-stepper/dist/js/bs-stepper.min.js",
            "https://www.googletagmanager.com/gtag/js"
        ],
        connectSrc: ["'self'", "https://api.salud.gob.sv/", "https://www.google-analytics.com/"],
        styleSrc: [
            "'self'",
            "fonts.googleapis.com",
            "'unsafe-inline'",
            "http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css",
            "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css",
            "https://cdn.datatables.net/v/bs4/dt-1.10.23/datatables.min.css",
            "https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css",
        ],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        imgSrc: [
            "'self'",
            "http://www.w3.org/2000/svg",
            "https://maps.gstatic.com",
            "https://maps.googleapis.com",
            "http://code.jquery.com/ui/1.12.1/themes/base/images/ui-icons_444444_256x240.png",
            "http://code.jquery.com/ui/1.12.1/themes/base/images/ui-icons_555555_256x240.png"
        ],
        frameSrc: ["'self'", "https://www.google.com"],
    },
};

module.exports = Directivas;
