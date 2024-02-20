window.addEventListener("load", principal);

function principal() {
    if (localStorage.getItem("usuario")) {
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioActual.nombre === "") {
            window.location.replace("../../../sesion.html");
        }
    } else {
        //Redirige al usuario a la pÃ¡gina de sesion no existen datos en el localStorage.
        window.location.replace("../../../sesion.html");
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../../sesion.html");
    }, 500);
}

function mostrarUsuarios(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    let contador = 0;
    contenedor.innerHTML = "";
    let contenedorResiduos = crearElemento("div", undefined, {
        id: "ContResiduos",
        class: "col-3",
        style: "border:2px black solid; padding:5px"
    });

    respuesta.forEach(fila => {
        let residuo = crearElemento("p", undefined, {
            id: "residuos"
        });

        for (let i = 0; i < Object.keys(fila).length / 2; i++) {
            residuo.innerHTML += fila[i] + " ";
        }
        contenedorResiduos.appendChild(residuo);
        contenedor.appendChild(contenedorResiduos);
        contador++;
    });

}

function navUsuarios() {
    let parametros = {
        claveTodosUsuarios: true
    };
    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        data: parametros,
        dataType: "json",
        success: mostrarUsuarios,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function crearElemento(etiqueta, contenido, atributos) {
    let elementoNuevo = document.createElement(etiqueta);
    if (contenido !== undefined) {
        let contenidoNuevo = document.createTextNode(contenido);
        elementoNuevo.appendChild(contenidoNuevo);
    }
    if (atributos !== undefined) {
        for (let clave in atributos) {
            elementoNuevo.setAttribute(clave, atributos[clave]);
        }
    }
    return elementoNuevo;
}