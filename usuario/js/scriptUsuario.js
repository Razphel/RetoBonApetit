window.addEventListener("load", principal);

function principal() {
    //Antes de cargar la pagina del usuario, se comprueba que no se haya accedido sin una sesion valida.
    if (localStorage.getItem("usuario")) {
        //Recibo los datos del usuario.
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));

        //Si por alguna razon no hay nada en el nombre, redirecciona al login.
        if (usuarioActual.nombre == "") {
            window.location.replace("../../inicio.html");
        }
    } else {
        //Si no existe la sesion redirecciona al login.
        window.location.replace("../../inicio.html");
    }

    //Boton para cerrar la sesion y redireccionar a la pagina de inicio.
    document.querySelector("#cerrarSesion").addEventListener("click", cerrarSesion);
    document.querySelector("#btnHistorial").addEventListener("click", botonHistorial);
    document.querySelector("#btnCategorias").addEventListener("click", botonCategorias);
}

function cerrarSesion() {
    //Borro la sesion del localStorage
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../html/sesion.html");
    }, 500);
}

function botonHistorial() {
    //Mostrar Historial.
    let usuarioActual = JSON.parse(localStorage.getItem("usuario"));

    let parametros = {
        //Uso el id del usuario recibido desde el login por el localStorage.
        claveUsuario: usuarioActual.clavePrimaria
    };

    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        data: parametros,
        dataType: "json",
        //La funcion que se ejecuta segun el resultado.
        success: mostrarHistorial,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });

    function mostrarHistorial(respuesta) {
        let salida = document.querySelector("#contenedor");
        salida.innerHTML = "";

        //Primero compruebo que el usuario tenga algo en su lista de pedidos.
        if (respuesta.length == 0) {
            salida.innerHTML = "Hictorial vacio.";
        } else {
            let historial = crearElemento("table", undefined, { id: "historial", style: "border-collapse: collapse;" });

            //Creo los titulos de las tablas.
            let titulos = crearElemento("tr", undefined, undefined);
            //Segun el formato en el que se recibe el objeto, tengo que usar sus elementos de la mitad al final.
            let prueba = Object.keys(respuesta[0]);
            for (let i = prueba.length / 2; i < prueba.length; i++) {
                //Creo cada elemento y lo agrego a la fila del titulo.
                let filaTitulo = crearElemento("th", prueba[i], { style: "padding:5px 30px;" });
                titulos.appendChild(filaTitulo);
            }

            //Agrego el titulo a la tabla.
            historial.appendChild(titulos);

            //Ahora agrego el contenido.
            respuesta.forEach(fila => {
                let filaNormal = crearElemento("tr", undefined, undefined);
                for (let i = 0; i < Object.keys(fila).length / 2; i++) {
                    let elementoFila = crearElemento("td", fila[i], undefined);
                    filaNormal.appendChild(elementoFila);
                }
                historial.appendChild(filaNormal);
            });
            contenedor.appendChild(historial);
        }
    }
}

function botonCategorias() {
    //Mostrar categorias.
    let parametros = { categoria: "categorias" };

    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        data: parametros,
        dataType: "json",
        //La funcion que se ejecuta segun el resultado.
        success: mostrarCategorias,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });

    function mostrarCategorias(respuesta) {
        //Ahora que tengo todos los datos de la tabla categorias, hago los elementos para guardarla.
        let salida = document.querySelector("#contenedor");
        salida.innerHTML = "";
        let categorias = crearElemento("div", undefined, { class: "row", id: "categorias" });

        respuesta.forEach(fila => {
            let contenedor = crearElemento("div", undefined, { class: "col-3", style: "border: 2px black solid; padding: 5px;" });

            let aux = crearElemento("p", undefined, undefined);
            aux.innerHTML = fila.descripcion;

            let aux3 = crearElemento("p", undefined, undefined);
            aux3.innerHTML = fila.imagenes;
            contenedor.appendChild(aux3);
            // let aux2 = document.createElement("img");
            // aux2.setAttribute("href", fila.imagen);
            // contenedor.appendChild(aux2);
            contenedor.appendChild(aux);
            categorias.appendChild(contenedor);
        });

        salida.appendChild(categorias);
    }
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