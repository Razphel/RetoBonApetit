window.addEventListener("load", principal);

function principal() {
    //Antes de cargar la pagina del usuario, se comprueba que no se haya accedido sin una sesion valida.
    if (localStorage.getItem("usuario")) {
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioActual.nombre === "") {
            window.location.replace("../../html/sesion.html");
        }
    }

    // Boton para cerrar la sesion y redireccionar a la pagina de inicio.
    document.querySelector("#cerrarSesion").addEventListener("click", cerrarSesion);
    document.querySelector("#btnCategorias").addEventListener("click", navCategorias);
    document.querySelector("#btnHistorial").addEventListener("click", navHistorial);
    document.querySelector("#btnProveedores").addEventListener("click", navProveedores);
    document.querySelector("#btnResiduos").addEventListener("click", navResiduos);
    document.querySelector("#btnUsuarios").addEventListener("click", navUsuarios);

    // $.ajax({
    //     //Ubicacion del archivo php que va a manejar los valores.
    //     url: "./php/consultaUsuarioResiduos.php",
    //     //Metodo en que los va a recibir.
    //     type: "GET",
    //     dataType: "json",
    //     //La funcion que se ejecuta segun el resultado.
    //     success: mostrarResiduos,
    //     error: function (jqXHR, textStatus, errorThrown) {
    //         console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
    //     }
    // });



}

//Consulta general para recibir productos. La funcion devuelve un array de objetos literales con los datos de los productos.
function consultarProductos() {
    let parametros = {
        pedirProductos: true
    };

    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        data: parametros,
        dataType: "json",
        success: guardarProductos,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });

    function guardarProductos(listaProdutos) {
        //Creo un array donde guardo todos los productos como objetos literales.
        let todosProductos = [];

        for (let i = 0; i < listaProdutos.length; i++) {
            //Creo un objeto literal con los datos de cada producto.
            let producto = {
                id_categoria: listaProdutos[i].Id_categoria,
                imagen_categoria: listaProdutos[i].Imagen_categoria,
                nombre_producto: listaProdutos[i].nombre_producto,
                nombre_categoria: listaProdutos[i].nombre_categoria,
                nombre_unidades: listaProdutos[i].nombre_unidades,
                nombre_observaciones: listaProdutos[i].nombre_observaciones
            }

            //Lo agrego al array de productos.
            todosProductos.push(producto);
        }

        return todosProductos;
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../html/sesion.html");
    }, 500);
}

function mostrarProveedores(proveedores) {
    let contenedor = document.querySelector("#contenedor");
    let contador = 0;
    contenedor.innerHTML = "";
    let contenedorProveedores = crearElemento("div", undefined, { id: "ContProveedores", class: "col-3", style: "border:2px black solid; padding:5px" });
    proveedores.forEach(fila => {
        let proveedor = crearElemento("p", undefined, { id: contenedor });
        for (let i = 0; i < Object.keys(fila).length / 2; i++) {
            proveedor.innerHTML += fila[i] + " ";
        }
        contenedorProveedores.appendChild(proveedor);
        contenedor.appendChild(contenedorProveedores);
        contador++;

    });
}

function navProveedores() {
    let parametros = {
        claveProveedores: true
    };
    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        data: parametros,
        dataType: "json",
        success: mostrarProveedores,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function mostrarResiduos(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    let contador = 0;
    contenedor.innerHTML = "";
    let contenedorResiduos = crearElemento("div", undefined, { id: "ContResiduos", class: "col-3", style: "border:2px black solid; padding:5px" });
    respuesta.forEach(fila => {
        let residuo = crearElemento("p", undefined, { id: "residuos" });
        for (let i = 0; i < Object.keys(fila).length / 2; i++) {
            residuo.innerHTML += fila[i] + " ";
        }
        contenedorResiduos.appendChild(residuo);
        contenedor.appendChild(contenedorResiduos);
        contador++;
    });
}

function navResiduos() {
    let parametros = {
        claveResiduos: true
    };
    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        data: parametros,
        dataType: "json",
        success: mostrarResiduos,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function mostrarUsuarios(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    let contador = 0;
    contenedor.innerHTML = "";
    let contenedorResiduos = crearElemento("div", undefined, { id: "ContResiduos", class: "col-3", style: "border:2px black solid; padding:5px" });
    respuesta.forEach(fila => {
        let residuo = crearElemento("p", undefined, { id: "residuos" });
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

function mostrarCategorias(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    contenedor.innerHTML = "";
    //Ahora que tengo todos los datos de la tabla categorias, hago los elementos para guardarla.
    let salida = document.querySelector("#contenedor");
    let categorias = crearElemento("div", undefined, { class: "row", id: "categorias" });

    // modelo de la carta de categorias
    // <div class="col-6 col-sm-3 col-md-3 col-lg-3">
    //     <div class="label_effect card p-3 mb-3" data-toggle="tooltip">
    //         <img src="../../img/pasteleria.png" alt="">
    //         <p>Pastelería</p>
    //     </div>
    // </div>

    respuesta.forEach(fila => {
        let carta = crearElemento("div", undefined, { class: "col-6 col-sm-3 col-md-3 col-lg-3" });
        let contenedor = crearElemento("div", undefined, { class: "label_effect card p-3 mb-3", "data-toggle": "tooltip" });
        let p = crearElemento("p", fila.descripcion, undefined);
        let img = crearElemento("img", undefined, { src: "../../img" + fila.imagenes, alt: fila.descripcion });

        //
    });

    salida.appendChild(categorias);
}

function navCategorias() {
    let parametros = {
        categoria: 'categorias'
    };
    //Mostrar categorias.
    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        dataType: "json",
        data: parametros,
        success: mostrarCategorias,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function mostrarHistorial(respuesta) {
    let salida = document.querySelector("#contenedor");
    salida.innerHTML = "";
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

function navHistorial() {
    //Mostrar Historial.
    //Se almacena en esta variable la información recogida desde el main
    let usuarioActual = JSON.parse(localStorage.getItem("usuario"));

    let parametros = {
        //UsuarioActual contiene todos los campos de usuario que se han almacenado anteriormente en principal 
        //Y clavePrimaria ha sido creada en el js de controlUsuario en la funcion manejarRespuesta
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