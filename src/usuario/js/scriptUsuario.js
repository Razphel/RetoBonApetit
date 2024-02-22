/*
    Páginas del usuario:
        - Productos (navProductos)
        - Pedidos (navPedidos)
        - Proveedores (navProveedores)
        - Residuos (navResiduos)

    Funciones comunes para el admin y el usuario (deberían ir en el js de assets):
        - crearElemento()
        - consultarProductos()
        - guardarProductos()
        - pagProductos()
*/

window.addEventListener("load", principal);

function principal() {
    document.querySelector("#navProductos").addEventListener("click", navProductos);
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
    //Se almacena en esta letiable la información recogida desde el main
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

// Página de inicio___________________________________________________________________
function inicioCategorias(respuesta) {
    //Contenedor general de la pagina.
    let contenedor = document.querySelector("#contenedor");

    //Contenedor de botones de categorias y h1 con el titulo de la vista inicio.
    let parteSuperior = crearElemento("div", undefined, {
        class: "row"
    });

    //Busco el nombre del usuario.
    let nombreUsuario = JSON.parse(localStorage.getItem("usuario"));
    nombreUsuario = nombreUsuario.nombre;

    let h1Inicio = crearElemento("h1", "Bienvenido, " + nombreUsuario, {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    parteSuperior.appendChild(h1Inicio);

    let categorias = crearElemento("div", undefined, {
        class: "row",
        id: "categorias"
    });

    respuesta.forEach(fila => {
        let carta = crearElemento("div", undefined, {
            class: "col-6 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-between"
        });

        //Le doy un id al contenedor para usarlo en el manejador.
        let divCarta = crearElemento("div", undefined, {
            id: "idCategoria_" + fila.id_categorias,
            class: "label_effect card card_margin p-3 mb-3",
            "data-toggle": "tooltip"
        });

        //Le doy un manejador a cada boton que usa el id para consultar las categorias.
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

    //Agrego el div con la lista de cartas al contenedor superior de la pagina.
    parteSuperior.appendChild(categorias);

    //Agrego el contenedor superior a la pagina.
    contenedor.appendChild(parteSuperior);
}

function inicioSolicitudes(respuesta) {
    let contenedor = document.querySelector("#contenedor");

    let historial = crearElemento("table", undefined, {
        id: "historial",
        style: "border-collapse: collapse;"
    });

    //Compruebo que exista algun dato.
    if (respuesta[0] != null) {
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
        let historial = crearElemento("p", "Historial Vacio.", {
            id: "historial"
        });
        contenedor.appendChild(historial);
    }

}

// Página productos___________________________________________________________________
function navProductos() {
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
        success: pagProductos,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function pagProductos(respuesta) {
    // Contenedor general de la pagina.
    let contenedor = document.querySelector("#contenedor");

    // Antes que nada, se limpia el contenedor.
    contenedor.innerHTML = "";

    // Contenedor de botones de categorias y h1 con el titulo de la vista inicio.
    let parteSuperior = crearElemento("div", undefined, undefined);
    let h1Inicio = crearElemento("h1", "Productos", {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    parteSuperior.appendChild(h1Inicio);

    let categorias = crearElemento("div", undefined, {
        class: "row",
        id: "categorias"
    });

    respuesta.forEach(fila => {
        let carta = crearElemento("div", undefined, {
            class: "col-6 col-sm-3 col-md-3 col-lg-3"
        });

        // Le doy un id al contenedor para usarlo en el manejador.
        let divCarta = crearElemento("div", undefined, {
            id: "idCategoria_" + fila.id_categorias,
            class: "label_effect card card_margin p-3 mb-3",
            "data-toggle": "tooltip"
        });

        // Le doy un manejador a cada boton que usa el id para consultar las categorias.
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

    //Agrego el div con la lista de cartas al contenedor superior de la pagina.
    parteSuperior.appendChild(categorias);

    //Agrego el contenedor superior a la pagina.
    contenedor.appendChild(parteSuperior);
}

// Página pedidos_____________________________________________________________________
function navPedidos() {
    //Mostrar Historial.
    //Se almacena en esta letiable la información recogida desde el main.
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
        success: pagPedidos,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function pagPedidos(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    contenedor.innerHTML = "";

    let pedidosTopUser = crearElemento("div", undefined, undefined);
    let h1Pedidos = crearElemento("h1", "Pedidos", {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    pedidosTopUser.appendChild(h1Pedidos);
    contenedor.appendChild(pedidosTopUser);

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

// Página proveedores_________________________________________________________________
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
        success: pagProveedores,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function pagProveedores(proveedores) {
    let contenedor = document.querySelector("#contenedor");
    let contador = 0;
    contenedor.innerHTML = "";

    let provTopUser = crearElemento("div", undefined, undefined);
    let h1Proveedores = crearElemento("h1", "Proveedores", {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    provTopUser.appendChild(h1Proveedores);
    contenedor.appendChild(provTopUser);

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

// Página residuos____________________________________________________________________
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
        success: pagResiduos,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function pagResiduos(respuesta) {
    let contenedor = document.querySelector("#contenedor");
    let contador = 0;
    contenedor.innerHTML = "";
    let contenedorResiduos = crearElemento("div", undefined, {
        id: "ContResiduos",
        class: "col-3",
        style: "border:2px black solid; padding:5px"
    });

    let resiTopUser = crearElemento("div", undefined, undefined);
    let h1Residuos = crearElemento("h1", "Residuos", {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    resiTopUser.appendChild(h1Residuos);
    contenedor.appendChild(resiTopUser);

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

function manejadorCategoria(e) {
    let textoDividido = this.id.split("_");
    let idCategoria = textoDividido[1];

    filtroCategoria(idCategoria);
}


function filtroCategoria(id_categoriaRecibido) {
    // Esta variable es un array de objetos literales, cada objeto tiene los datos del producto y categorias.
    // Cada producto tiene este formato:
    // producto = {
    //     id_categoria: Id_categoria,
    //     imagen_categoria: Imagen_categoria,
    //     nombre_producto: nombre_producto,
    //     nombre_categoria: nombre_categoria,
    //     nombre_unidades: nombre_unidades,
    //     nombre_observaciones: nombre_observaciones
    // }
    let todosProductos = JSON.parse(localStorage.getItem("todosProductos"));

    //Contenedor principal de la pagina.
    let contenedor = document.querySelector("#contenedor");

    //Se cambia el titulo de la pagina para que coincida con los productos.
    let tituloApartado = document.querySelector("#tituloApartado");
    if (tituloApartado != null && tituloApartado.innerHTML != "Productos") {
        tituloApartado.innerHTML = "Productos";
    }

    // En caso de que sea la primera vez que cargue la pagina, va a haber una seccion con id historial. Lo elimino
    let historial = document.querySelector("#historial");
    if (historial != null) {
        historial.remove();
    }

    // Contenedor inferior de la pagina. La tabla se crea por separado del inicio y las categorias.
    // Este contenedor se crea si no existe todavia.
    let parteInferior = document.querySelector("#parteInferior");
    if (document.querySelector("#parteInferior") == null) {
        parteInferior = crearElemento("div", undefined, {
            id: "parteInferior",
            class: "mt-5"
        });
    }

    // Div reservado para hacer el filtro de la tabla, se crea si todavia no existe.
    let filtro = document.querySelector("#filtro");
    if (filtro == null) {
        filtro = crearElemento("div", "Fila reservada para el filtro.", {
            id: "filtro"
        });
        parteInferior.appendChild(filtro);
    }

    // Compruebo si existe el contenedor de la tabla. Si existe se elimina para imprimir uno con nuevos datos.
    if (document.querySelector("#contenedorTablaProductos") != null) {
        document.querySelector("#contenedorTablaProductos").remove();
    }

    // Contenedor para la tabla de productos
    let contenedorTablaProductos = crearElemento("div", undefined, {
        class: "row",
        id: "contenedorTablaProductos"
    });

    // Crear la tabla
    let tabla = crearElemento("table", undefined, {
        id: "tabla",
        class: "table table-responsive table-hover"
    });
    let tablaHead = crearElemento("thead");
    let tablaBody = crearElemento("tbody");

    // Crear la fila de encabezado
    let filaHead = crearElemento("tr");

    // Crear el checkbox en la primera celda de encabezado
    let celdaCheckbox = crearElemento("th");
    let inputCheckbox = crearElemento("input", undefined, {
        type: "checkbox",
        class: "genericoCheckCabecera"
    });
    celdaCheckbox.appendChild(inputCheckbox);
    filaHead.appendChild(celdaCheckbox);

    // Crear las celdas de encabezado restantes
    let titulos = ["Producto", "Categoría", "Unidades", "Observaciones", ""];
    titulos.forEach(titulo => {
        let celdaHead = crearElemento("th", titulo);
        filaHead.appendChild(celdaHead);
    });

    // Recorrer todos los productos y agregarlos a la tabla si son de la misma categoría recibida
    for (let i = 0; i < todosProductos.length; i++) {
        if (todosProductos[i]["id_categoria"] == id_categoriaRecibido) {
            let filaBody = crearElemento("tr", undefined, {
                class: "p-2"
            });

            // Crear celda para el checkbox
            let celdaCheckbox = crearElemento("td");
            let inputCheckbox = crearElemento("input", undefined, {
                type: "checkbox",
                class: "genericoCheck"
            });
            celdaCheckbox.appendChild(inputCheckbox);
            filaBody.appendChild(celdaCheckbox);

            // Crear celdas para los datos del producto
            let datosProducto = [
                todosProductos[i]["nombre_producto"],
                todosProductos[i]["nombre_categoria"],
                todosProductos[i]["nombre_unidades"],
                todosProductos[i]["nombre_observaciones"]
            ];

            datosProducto.forEach((dato, index) => {
                let celdaBody = crearElemento("td");
    
                // Si estamos en la columna "nombre_categoria", agregamos la imagen de la categoría
                if (index === 1) {
                    let imagenCategoria = crearElemento("img", undefined, {
                        src: `../../../assets/img/categorias/${todosProductos[i]["imagen_categoria"]}`,
                        width: "30px",
                        class: "categoriaImgTabla"
                    });
                    celdaBody.appendChild(imagenCategoria);
                }
                celdaBody.innerHTML += dato;
                filaBody.appendChild(celdaBody);
            });

            let celdaBoton = crearElemento("td"); // celda para el input y el botón de la tabla
            let inputCantidad = crearElemento("input", undefined, {
                type: "number",
                value: "0",
                id: "inputCantidad",
                class: "form-control form-control-sm mr-2"
            });
            let botonAñadir = crearElemento("input", undefined, {
                type: "submit",
                class: "btn btn_custom_1 btn_sm",
                value: "Añadir"
            })
            celdaBoton.appendChild(inputCantidad);
            celdaBoton.appendChild(botonAñadir);
            filaBody.appendChild(celdaBoton);

            // Agregar la fila al cuerpo de la tabla
            tablaBody.appendChild(filaBody);
        }
    }

    // Agregar la fila de encabezado a la sección de encabezado de la tabla
    tablaHead.appendChild(filaHead);

    // Agregar las secciones de encabezado y cuerpo a la tabla
    tabla.appendChild(tablaHead);
    tabla.appendChild(tablaBody);

    // Agregar la tabla al contenedor de contenido de categoría
    contenedorTablaProductos.appendChild(tabla);

    // Agregar el contenido de categoría al contenedor principal
    contenedor.appendChild(contenedorTablaProductos);
}