window.addEventListener("load", principal);

function principal() {
    //Antes de cargar la pagina del usuario, se comprueba que no se haya accedido sin una sesion valida.
    if (localStorage.getItem("usuario")) {
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioActual.nombre === "") {
            window.location.replace("../../inicio.html");
        }
    }

    //Boton para cerrar la sesion y redireccionar a la pagina de inicio.
    document.querySelector("#cerrarSesion").addEventListener("click", cerrarSesion);
    let sesionActual = localStorage.getItem("usuario");

    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        dataType: "json",
        //La funcion que se ejecuta segun el resultado.
        success: mostrarCategorias,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });

}

function cerrarSesion() {
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../inicio.html");
    }, 500);
}

function mostrarCategorias(respuesta) {
    //Ahora que tengo todos los datos de la tabla categorias, hago los elementos para guardarla.
    let salida = document.querySelector("#categorias");

    respuesta.forEach(fila => {
        let contenedor = document.createElement("div");
        contenedor.addEventListener("click", mostrarProductos);
        contenedor.setAttribute("class", "col-3");
        contenedor.style.border = "2px black solid";

        let aux = document.createElement("p");
        aux.innerHTML = fila.descripcion;

        let aux3 = document.createElement("p");
        aux3.innerHTML = fila.imagenes;
        contenedor.appendChild(aux3);
        // let aux2 = document.createElement("img");
        // aux2.setAttribute("href", fila.imagen);
        // contenedor.appendChild(aux2);
        contenedor.appendChild(aux);
        salida.appendChild(contenedor);
    });

}

function mostrarProductos(e) {
    //Selecciono el elemento p dentro del cuadro categoria en el que se haga click y recibo su texto, esto sera la categoria a mostrar.
    let categoria = this.querySelector("p").textContent;

    let parametros = { categoriaEnviada: categoria };

    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        dataType: "json",
        //La funcion que se ejecuta segun el resultado.
        success: mostrarCategorias,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

