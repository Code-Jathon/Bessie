export function showMessages(mensaje, type = "success") {
    Toastify({
        text: mensaje,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        // close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type === "success" ? "linear-gradient(to right, #f39200, #007b99)" : 
                                            "linear-gradient(to right, #007b99, #848585)",
        },
        onClick: function(){ } // Callback after click
      }).showToast();
}