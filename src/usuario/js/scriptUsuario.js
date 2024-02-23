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
            dataType: "json",
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
    let contador = 0;
    contenedor.innerHTML = "";
    let contenedorSolicitudesInicio = crearElemento("div",undefined,{id:"ContProveedores",class:"col-3",style:"border:2px black solid; padding:5px"});
    respuesta.forEach(fila => {
        let solicitud = crearElemento("p",undefined,{id:contenedor});
        for (let i = 0; i < Object.keys(fila).length/2; i++) 
        {   
            solicitud.innerHTML += fila[i] + " ";
        }
        contenedorSolicitudesInicio.appendChild(solicitud);
        contenedor.appendChild(contenedorSolicitudesInicio);
        contador++;

    });
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

    // Contenedor inferior de la pagina. La tabla se crea por separado del inicio y las categorias.
    // Este contenedor se crea si no existe todavia.
    let parteInferior = document.querySelector("#parteInferior");
    if (document.querySelector("#parteInferior") == null) {
        parteInferior = crearElemento("div", undefined, {
            id: "parteInferior",
            class: "mt-5"
        });
    }
    contenedor.appendChild(parteInferior);
    imprimirFiltroTabla();
    imprimirTablaProductos();

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

function manejadorFiltro(e) {
    let nombre = document.getElementById("filtroBuscadorNombre").value.trim();
    let categoria = document.getElementById("filtroDesplegableCategoria").value;
    let unidades = document.getElementById("filtroDesplegableUnidades").value;

    // Si la opción por defecto está seleccionada, asigna null
    if (categoria === "Categorías") {
        categoria = null;
    }
    if (unidades === "Ud. de medida") {
        unidades = null;
    }

    imprimirTablaProductos(nombre, categoria, unidades);
}

function filtroCategoria(id_categoriaRecibido) {
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

    contenedor.appendChild(parteInferior);

    imprimirFiltroTabla(null, id_categoriaRecibido, null);
    imprimirTablaProductos(null, id_categoriaRecibido, null);
}

function imprimirFiltroTabla(nombre = null, categoria = null, unidades = null) {
    let todosProductos = JSON.parse(localStorage.getItem("todosProductos"));
    let parteInferior = document.querySelector("#parteInferior");

    let contenedorFiltroLabelySelect = crearElemento("div", undefined, { // contiene el div contenedorFiltroLabel y contenedorFiltroSelect
        id: "contenedorFiltroLabelySelect",
        class: "contenedorFiltroLabelySelect"
    });

    let contenedorFiltroLabel = crearElemento("div", undefined, { // contiene el icono de filtros y el texto "Filtrar por"
        id: "contenedorFiltroLabel",
        class: "contenedorFiltroLabel"
    });

    // Crear el icono de filtros
    let iconoFiltros = document.createElement("i");
    iconoFiltros.classList.add("bi", "bi-sliders");

    let labelFiltros = crearElemento("p", "Filtrar por", {
        id: "labelFiltro"
    });

    contenedorFiltroLabel.appendChild(iconoFiltros);
    contenedorFiltroLabel.appendChild(labelFiltros);

    let contenedorFiltroSelect = crearElemento("div", undefined, {
        id: "contenedorFiltroSelect",
        class: "contenedorFiltroSelect"
    });

    // Crear el contenedor del filtro
    // Se renueva el filtro.
    let contenedorFiltro = document.querySelector("#filtro");
    if (contenedorFiltro != null) {
        contenedorFiltro.remove();
    }

    contenedorFiltro = crearElemento("div", undefined, {
        id: "filtro",
        class: "row contenedorFiltros"
    });

    // Crear el desplegable para las categorías
    let selectCategoria = crearElemento("select", undefined, {
        id: "filtroDesplegableCategoria",
        class: "form-select selectFiltros"
    });
    selectCategoria.addEventListener("change", manejadorFiltro);
    let optionDefaultCategoria = document.createElement("option");
    optionDefaultCategoria.text = "Categorías";
    selectCategoria.add(optionDefaultCategoria);
    let categorias = [...new Set(todosProductos.map(producto => producto.id_categoria))];
    categorias.forEach(id => {
        let optionCategoria = document.createElement("option");
        optionCategoria.text = todosProductos.find(producto => producto.id_categoria == id).nombre_categoria;
        optionCategoria.value = id;
        if (id == categoria) {
            optionCategoria.selected = true;
        }
        selectCategoria.add(optionCategoria);
    });
    contenedorFiltroSelect.appendChild(selectCategoria);

    // Crear el desplegable para las unidades
    let selectUnidades = crearElemento("select", undefined, {
        id: "filtroDesplegableUnidades",
        class: "form-select selectFiltros"
    });
    selectUnidades.addEventListener("change", manejadorFiltro);
    let optionDefaultUnidades = document.createElement("option");
    optionDefaultUnidades.text = "Ud. de medida";
    selectUnidades.add(optionDefaultUnidades);
    let unidadesFiltro = [...new Set(todosProductos.map(producto => producto.nombre_unidades))];
    unidadesFiltro.forEach(unidad => {
        let optionUnidad = document.createElement("option");
        optionUnidad.text = unidad;
        if (unidad == unidades) {
            optionUnidad.selected = true;
        }
        selectUnidades.add(optionUnidad);
    });
    contenedorFiltroSelect.appendChild(selectUnidades);

    contenedorFiltroLabelySelect.appendChild(contenedorFiltroLabel);
    contenedorFiltroLabelySelect.appendChild(contenedorFiltroSelect);

    contenedorFiltro.appendChild(contenedorFiltroLabelySelect);

    // Crear el campo de texto para el nombre
    let inputNombre = crearElemento("input", undefined, {
        id: "filtroBuscadorNombre",
        type: "text",
        placeholder: "Buscar por nombre de producto...",
        class: "form-control filtroBuscador",
        value: nombre || ""
    });
    inputNombre.addEventListener("input", manejadorFiltro);
    contenedorFiltro.appendChild(inputNombre);

    // Añadir el contenedor del filtro al DOM
    parteInferior.appendChild(contenedorFiltro);
}

function imprimirTablaProductos(nombre = null, categoria = null, unidades = null) {
    let todosProductos = JSON.parse(localStorage.getItem("todosProductos"));

    let contenedorTablaProductos = document.querySelector("#contenedorTablaProductos");
    if (contenedorTablaProductos == null) {
        contenedorTablaProductos = crearElemento("div", undefined, {
            class: "row",
            id: "contenedorTablaProductos"
        });
    } else {
        contenedorTablaProductos.innerHTML = "";
    }

    let tabla = crearElemento("table", undefined, {
        id: "tabla",
        class: "table table-responsive table-hover mt-4"
    });
    let tablaHead = crearElemento("thead");
    let tablaBody = crearElemento("tbody");

    let filaHead = crearElemento("tr");
    let celdaCheckbox = crearElemento("th");
    let inputCheckbox = crearElemento("input", undefined, {
        type: "checkbox",
        class: "genericoCheckCabecera"
    });
    celdaCheckbox.appendChild(inputCheckbox);
    filaHead.appendChild(celdaCheckbox);

    let titulos = ["Producto", "Categoría", "Unidades", "Observaciones", ""];
    let productosEncontrados = false;

    titulos.forEach(titulo => {
        let celdaHead = crearElemento("th", titulo);
        filaHead.appendChild(celdaHead);
    });

    for (let i = 0; i < todosProductos.length; i++) {
        let filaBody = crearElemento("tr");

        let celdaCheckbox = crearElemento("td");
        let inputCheckbox = crearElemento("input", undefined, {
            type: "checkbox",
            class: "genericoCheck"
        });
        celdaCheckbox.appendChild(inputCheckbox);
        filaBody.appendChild(celdaCheckbox);

        let datosProducto = [
            todosProductos[i]["nombre_producto"],
            todosProductos[i]["nombre_categoria"],
            todosProductos[i]["nombre_unidades"],
            todosProductos[i]["nombre_observaciones"]
        ];

        if ((nombre === null || todosProductos[i]["nombre_producto"].toLowerCase().includes(nombre.toLowerCase())) &&
            (categoria === null || todosProductos[i]["id_categoria"] == categoria) &&
            (unidades === null || todosProductos[i]["nombre_unidades"] == unidades)) {

            datosProducto.forEach((dato, index) => {
                let celdaBody = crearElemento("td");

                if (index === 1) {
                    let imagenCategoria = crearElemento("img", undefined, {
                        src: `../../../assets/img/categorias/${todosProductos[i]["imagen_categoria"]}`,
                        width: "35px",
                    });
                    celdaBody.appendChild(imagenCategoria);
                }
                celdaBody.innerHTML += dato;
                filaBody.appendChild(celdaBody);
            });

            let celdaBoton = crearElemento("td");
            let inputCantidad = crearElemento("input", undefined, {
                type: "number",
                value: "0",
                id: "inputCantidad_" + i,
                class: "form-control form-control-sm"
            });
            let botonAñadir = crearElemento("input", undefined, {
                id: "botonAñadir_" + i,
                type: "submit",
                class: "btn btn_custom_1 btn_sm",
                value: "Añadir"
            })
            botonAñadir.addEventListener("click", agregarCesta);
            celdaBoton.appendChild(inputCantidad);
            celdaBoton.appendChild(botonAñadir);
            filaBody.appendChild(celdaBoton);

            tablaBody.appendChild(filaBody);
            productosEncontrados = true;
        }
    }

    tablaHead.appendChild(filaHead);
    tabla.appendChild(tablaHead);
    tabla.appendChild(tablaBody);

    contenedorTablaProductos.appendChild(tabla);
    contenedor.appendChild(contenedorTablaProductos);

    if (!productosEncontrados) {
        contenedorTablaProductos.innerHTML = "";
        let mensajeVacio = mostrarMensajeVacio("No hay productos", "¿Hacer una solicitud de producto?", "Hacer solicitud");
        contenedorTablaProductos.appendChild(mensajeVacio);
    }
}

// Contenedor con borde punteado que aparece cuando una tabla está vacía o no tiene contenido
function mostrarMensajeVacio(titulo, texto, textoBoton) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");

    let divCol = document.createElement("div");
    divCol.classList.add("col-6", "col-sm-3", "col-md-3", "col-lg-12");

    let divLabelEmpty = document.createElement("div");
    divLabelEmpty.classList.add("label_empty", "card", "p-4", "align-items-center", "mt-4");

    let h4 = document.createElement("h4");
    h4.textContent = titulo;

    let p = document.createElement("p");
    p.textContent = texto;

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("btn", "btn_custom_1", "mt-3");
    button.textContent = textoBoton;

    // Construir la estructura
    divLabelEmpty.appendChild(h4);
    divLabelEmpty.appendChild(p);
    divLabelEmpty.appendChild(button);

    divCol.appendChild(divLabelEmpty);
    divRow.appendChild(divCol);

    return divRow;
}

function agregarCesta(e) {
    let todosProductos = JSON.parse(localStorage.getItem("todosProductos"));

    // Separar el id del botón, el índice del producto seleccionado está después del guion bajo.
    let textoDividido = this.id.split("_");
    let productoSeleccionado = parseInt(textoDividido[1]);

    // Busco la cantidad de productos a añadir.
    let cantidadRecibida = parseInt(document.querySelector("#inputCantidad_" + productoSeleccionado).value);

    // Si la cantidad es 0 o menor, no hacemos nada
    if (cantidadRecibida <= 0) {
        return;
    }

    // Obtengo la cesta o creo una nueva si no existe
    let cesta = JSON.parse(localStorage.getItem("cesta")) || [];

    // Verificar si el producto ya está en la cesta, comparo que sea el mismo producto de la misma categoria.
    let productoEnCestaIndex = cesta.findIndex(item =>
        item.nombre_producto === todosProductos[productoSeleccionado].nombre_producto &&
        item.nombre_categoria === todosProductos[productoSeleccionado].nombre_categoria
    );

    if (productoEnCestaIndex === -1) {
        // Si el producto no está en la cesta, agregarlo con la cantidad recibida
        let nuevoProducto = {
            ...todosProductos[productoSeleccionado],
            cantidad: cantidadRecibida
        };
        cesta.push(nuevoProducto);
    } else {
        // Si el producto ya está en la cesta, sumar la cantidad recibida a la cantidad existente
        cesta[productoEnCestaIndex].cantidad += cantidadRecibida;
    }

    // Guardar la cesta actualizada en el almacenamiento local
    localStorage.setItem("cesta", JSON.stringify(cesta));

    // Aquí puedes realizar otras acciones, como actualizar la visualización de la cesta, etc.
    console.log(cesta);
}
function mostrarSolicitudesInicio(solicitudesInicio) {
    
    let contenedor = document.querySelector("#contenedor");
    let contador = 0;
    contenedor.innerHTML = "";
    let contenedorSolicitudesInicio = crearElemento("div",undefined,{id:"ContProveedores",class:"col-3",style:"border:2px black solid; padding:5px"});
    solicitudesInicio.forEach(fila => {
        let solicitud = crearElemento("p",undefined,{id:contenedor});
        for (let i = 0; i < Object.keys(fila).length/2; i++) 
        {   
            solicitud.innerHTML += fila[i] + " ";
        }
        contenedorSolicitudesInicio.appendChild(solicitud);
        contenedor.appendChild(contenedorSolicitudesInicio);
        contador++;

    });

}