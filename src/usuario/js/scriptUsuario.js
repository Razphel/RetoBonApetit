window.addEventListener("load", principal);

function principal() {
    //Antes de cargar la pagina del usuario, se comprueba que no se haya accedido sin una sesion valida.
    if (localStorage.getItem("usuario")) {
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioActual.nombre === "") {
            window.location.replace("../../../sesion.html");
        }
    } else {
        //Redirige al usuario a la página de sesion no existen datos en el localStorage.
        window.location.replace("../../../sesion.html");
    }

    // Boton para cerrar la sesion y redireccionar a la pagina de inicio.
    document.querySelector("#cerrarSesion").addEventListener("click", cerrarSesion);
    document.querySelector("#navProductos").addEventListener("click", navCategorias);
    document.querySelector("#navPedidos").addEventListener("click", navPedidos);
    document.querySelector("#navProveedores").addEventListener("click", navProveedores);
    document.querySelector("#navResiduos").addEventListener("click", navResiduos);

    //Aqui es necesario que las consultas se ejecuten en el orden correcto.
    //Para eso hay que evitar que el ajax funcione de forma asincrona agregando async: false.
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
        async: false,
        success: inicioCategorias,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });

    //Mostrar Historial.
    //Se almacena en esta variable la información recogida desde el main
    let usuarioActual = JSON.parse(localStorage.getItem("usuario"));

    parametros = {
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
        async: false,
        dataType: "json",
        //La funcion que se ejecuta segun el resultado.
        success: inicioSolicitudes,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });

    //Guardo en el localStorage el listado con todos los productos.
    consultarProductos();
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

        localStorage.setItem("todosProductos", JSON.stringify(todosProductos));
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../../sesion.html");
    }, 500);
}

function mostrarProveedores(proveedores) {
    let contenedor = document.querySelector("#contenedor");
    let contador = 0;
    contenedor.innerHTML = "";
    let contenedorProveedores = crearElemento("div", undefined, {
        id: "ContProveedores",
        class: "col-3",
        style: "border:2px black solid; padding:5px"
    });

    proveedores.forEach(fila => {
        let proveedor = crearElemento("p", undefined, {
            id: contenedor
        });

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

function mostrarCategorias(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    contenedor.innerHTML = "";
    let categorias = crearElemento("div", undefined, {
        class: "row",
        id: "categorias"
    });

    // modelo de la carta de categorias
    // <div class="col-6 col-sm-3 col-md-3 col-lg-3">
    //     <div class="label_effect card p-3 mb-3" data-toggle="tooltip">
    //         <img src="../../img/pasteleria.png" alt="">
    //         <p>Pastelería</p>
    //     </div>
    // </div>

    respuesta.forEach(fila => {
        let carta = crearElemento("div", undefined, { class: "col-6 col-sm-3 col-md-3 col-lg-3" });
        let divCarta = crearElemento("div", undefined, {
            id: "idCategoria_" + fila.id_categorias,
            class: "label_effect card p-3 mb-3",
            "data-toggle": "tooltip"
        });
        divCarta.addEventListener("click", manejadorCategoria);

        let p = crearElemento("p", fila.descripcion, undefined);
        let img = crearElemento("img", undefined, {
            id: "idCategoria_" + fila.id_categorias,
            src: "../../../assets/img/categorias/" + fila.imagenes,
            alt: fila.descripcion
        });

        //Organizo los elementos y los agrego al div row.
        divCarta.appendChild(img);
        divCarta.appendChild(p);
        carta.appendChild(divCarta);
        categorias.appendChild(carta);
    });

    //Agrego el div con la lista de cartas al contenedor principal de la pagina.
    contenedor.appendChild(categorias);
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

function mostrarPedidos(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    contenedor.innerHTML = "";

    //Se comprueba primero que exista algo en el historial de solicitudes.
    if (respuesta[0] != null) {
        let historial = crearElemento("table", undefined, {
            id: "historial",
            style: "border-collapse: collapse;"
        });

        //Creo los titulos de las tablas.
        let titulos = crearElemento("tr", undefined, undefined);
        //Segun el formato en el que se recibe el objeto, tengo que usar sus elementos de la mitad al final.
        let prueba = Object.keys(respuesta[0]);
        for (let i = prueba.length / 2; i < prueba.length; i++) {
            //Creo cada elemento y lo agrego a la fila del titulo.
            let filaTitulo = crearElemento("th", prueba[i], {
                style: "padding:5px 30px;"
            });
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
    } else {
        let sinHistorial = crearElemento("p", "Historial Vacio.", undefined)
        contenedor.appendChild(sinHistorial);
    }


}

function navPedidos() {
    //Mostrar Historial.
    //Se almacena en esta variable la información recogida desde el main.
    let usuarioActual = JSON.parse(localStorage.getItem("usuario"));

    let parametros = {
        //UsuarioActual contiene todos los campos de usuario que se han almacenado anteriormente en principal .
        //Y clavePrimaria ha sido creada en el js de controlUsuario en la funcion manejarRespuesta.
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
        success: mostrarPedidos,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function inicioCategorias(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    let categorias = crearElemento("div", undefined, {
        class: "row",
        id: "categorias"
    });

    // modelo de la carta de categorias
    // <div class="col-6 col-sm-3 col-md-3 col-lg-3">
    //     <div class="label_effect card p-3 mb-3" data-toggle="tooltip">
    //         <img src="../../img/pasteleria.png" alt="">
    //         <p>Pastelería</p>
    //     </div>
    // </div>

    respuesta.forEach(fila => {
        let carta = crearElemento("div", undefined, {
            class: "col-6 col-sm-3 col-md-3 col-lg-3"
        });

        //Le doy un id al contenedor para usarlo en el manejador.
        let divCarta = crearElemento("div", undefined, {
            id: "idCategoria_" + fila.id_categorias,
            class: "label_effect card p-3 mb-3",
            "data-toggle": "tooltip"
        });
        divCarta.addEventListener("click", manejadorCategoria);

        let p = crearElemento("p", fila.descripcion, undefined);
        let img = crearElemento("img", undefined, {
            src: "../../../assets/img/categorias/" + fila.imagenes,
            alt: fila.descripcion
        });

        //Organizo los elementos y los agrego al div row.
        divCarta.appendChild(img);
        divCarta.appendChild(p);
        carta.appendChild(divCarta);
        categorias.appendChild(carta);
    });

    //Agrego el div con la lista de cartas al contenedor principal de la pagina.
    contenedor.appendChild(categorias);
}

function inicioSolicitudes(respuesta) {
    let contenedor = document.querySelector("#contenedor");

    //Compruebo que exista algun dato.
    if (respuesta[0] != null) {

        let historial = crearElemento("table", undefined, {
            id: "historial",
            style: "border-collapse: collapse;"
        });

        //Creo los titulos de las tablas.
        let titulos = crearElemento("tr", undefined, undefined);
        //Segun el formato en el que se recibe el objeto, tengo que usar sus elementos de la mitad al final.
        let prueba = Object.keys(respuesta[0]);
        for (let i = prueba.length / 2; i < prueba.length; i++) {
            //Creo cada elemento y lo agrego a la fila del titulo.
            let filaTitulo = crearElemento("th", prueba[i], {
                style: "padding:5px 30px;"
            });
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
    else {
        let sinHistorial = crearElemento("p", "Historial Vacio.", undefined)
        contenedor.appendChild(sinHistorial);
    }

}

function manejadorCategoria(e) {
    let textoDividido = this.id.split("_");
    let idCategoria = textoDividido[1];

    filtroCategoria(idCategoria);
}

function filtroCategoria(id_categoriaRecibido) {
    //Esta variable es un array de objetos literales, cada objeto tiene los datos del producto y categorias.
    //Cada producto tiene este formato:
    // producto = {
    //     id_categoria: Id_categoria,
    //     imagen_categoria: Imagen_categoria,
    //     nombre_producto: nombre_producto,
    //     nombre_categoria: nombre_categoria,
    //     nombre_unidades: nombre_unidades,
    //     nombre_observaciones: nombre_observaciones
    // }

    let todosProductos = JSON.parse(localStorage.getItem("todosProductos"));
    let contenedor = document.querySelector("#contenedor");
    let contenidoCategoria = crearElemento("div", undefined, undefined);

    let tabla = crearElemento("table", undefined, undefined);
    let tr = crearElemento("tr", undefined, undefined);

    //Se crean los titulos de la tabla.
    let th = crearElemento("th", "Producto", undefined);
    tr.appendChild(th);
    th = crearElemento("th", "Categoria", undefined);
    tr.appendChild(th);
    th = crearElemento("th", "Unidades", undefined);
    tr.appendChild(th);
    th = crearElemento("th", "Observaciones", undefined);
    tr.appendChild(th);
    tabla.appendChild(tr);

    //Ahora recorro todos los productos y los guardo en la tabla si son de la misma categoria recibida.
    for (let i = 0; i < todosProductos.length; i++) {
        tr = crearElemento("tr", undefined, undefined);
        if (todosProductos[i]["id_categoria"] == id_categoriaRecibido) {
            let td = crearElemento("td", todosProductos[i]["nombre_producto"], undefined);
            tr.appendChild(td);
            td = crearElemento("td", todosProductos[i]["nombre_categoria"], undefined);
            tr.appendChild(td);
            td = crearElemento("td", todosProductos[i]["nombre_unidades"], undefined);
            tr.appendChild(td);
            td = crearElemento("td", todosProductos[i]["nombre_observaciones"], undefined);
            tr.appendChild(td);

            tabla.appendChild(tr);
        }
    }

    //Limpio el elemento que va a contener la tabla para que no se cree mas de una a la vez.
    if (contenidoCategoria.parentNode != null) {
        contenidoCategoria.parentNode.removeChild(contenidoCategoria);
    }

    contenidoCategoria.appendChild(tabla);

    //Agrego el elemento al contenedor principal.
    contenedor.appendChild(contenidoCategoria);
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