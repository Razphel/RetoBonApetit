window.addEventListener("load", principal);

function principal() {
    document.querySelector("#cerrarSesion").addEventListener("click", cerrarSesion);
    let sesionActual = localStorage.getItem("usuario");
    console.log(sesionActual.admin);
}

function cerrarSesion() {
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../html/sesion.html");
    }, 500);
}