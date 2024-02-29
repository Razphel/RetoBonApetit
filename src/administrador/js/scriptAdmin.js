/*
    Páginas del administrador:
        - Inicio________________________________________________ navInicio() -> pagInicio()
        - Categorías____________________________________________ navCategorias() -> pagListarCategorias()
            - Listar categorías................... navListarCategorias() -> pagListarCategorias()
            - Añadir categoría.................... navAñadirCategoria() -> pagAñadirCategoria()
        - Productos_____________________________________________ navProductos() -> pagListarProductos()
            - Listar productos.................... navListarProductos() -> pagListarProductos()
            - Añadir producto..................... navAñadirProducto() -> pagAñadirProducto()
            - Ud. de medida....................... navUdMedida() -> pagUdMedida()
        - Solicitudes___________________________________________ navSolicitudes() -> pagSolicitudes()
        - Pedidos_______________________________________________ navPedidos() -> pagListarPedidos()
            - Listar pedidos...................... navListarPedidos() -> pagListarPedidos()
            - Añadir pedido....................... navAñadirPedido() -> pagAñadirPedido()
        - Usuarios______________________________________________ navUsuarios() -> pagListarUsuarios()
            - Listar usuarios..................... navListarUsuarios() -> pagListarUsuarios()
            - Añadir usuario...................... navAñadirUsuario() -> pagAñadirUsuario()
        - Proveedores___________________________________________ navProveedores() -> pagListarProveedores()
            - Listar proveedores.................. navListarProveedores() -> pagListarProveedores()
            - Añadir proveedor.................... navAñadirProveedor() -> pagAñadirProveedor()
        - Residuos______________________________________________ navResiduos() -> pagResiduos()

    Funciones comunes para el admin y el usuario (useryadmin.js):
        - cerrarSesion()
        - crearElemento()
        - crearFormulario()
        - consultarProductos()
        - guardarProductos()
*/

window.addEventListener("load", principal);

function principal() {
    // Apartado inicio
    document.querySelector("#navInicio").addEventListener("click", navInicio);
    // Apartado categorías
    document.querySelector("#navListarCategorias").addEventListener("click", navListarCategorias);
    document.querySelector("#navAñadirCategoria").addEventListener("click", navAñadirCategoria);
    document.querySelector("#shortcut_categoria").addEventListener("click", navAñadirCategoria);
    // Apartado productos
    document.querySelector("#navListarProductos").addEventListener("click", navListarProductos);
    document.querySelector("#navAñadirProducto").addEventListener("click", navAñadirProducto);
    document.querySelector("#shortcut_producto").addEventListener("click", navAñadirProducto);
    document.querySelector("#navUdMedida").addEventListener("click", navUdMedida);
    document.querySelector("#shortcut_medida").addEventListener("click", navUdMedida);
    // Apartado solicitudes
    document.querySelector("#navSolicitudes").addEventListener("click", navSolicitudes);
    // Apartado pedidos
    document.querySelector("#navListarPedidos").addEventListener("click", navListarPedidos);
    document.querySelector("#navNuevoPedido").addEventListener("click", navNuevoPedido);
    document.querySelector("#shortcut_pedido").addEventListener("click", navNuevoPedido);
    // Apartado usuarios
    document.querySelector("#navListarUsuarios").addEventListener("click", navListarUsuarios);
    document.querySelector("#navAñadirUsuario").addEventListener("click", navAñadirUsuario);
    document.querySelector("#shortcut_usuario").addEventListener("click", navAñadirUsuario);
    // Apartado proveedores
    document.querySelector("#navListarProveedores").addEventListener("click", navListarProveedores);
    document.querySelector("#navAñadirProveedor").addEventListener("click", navAñadirProveedor);
    document.querySelector("#shortcut_proveedor").addEventListener("click", navAñadirProveedor);
    document.querySelector("#cerrarSesion").addEventListener("click", cerrarSesion);
    // Apartado residuos
    document.querySelector("#navResiduos").addEventListener("click", navResiduos);

    // Seleccionar los elementos clickeables del menú
    const menuItems = document.querySelectorAll('.active');

    // Iterar sobre cada elemento y agregar un manejador de eventos 'click'
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remover la clase 'gray-bg' de todos los contenedores 'nav_container'
            document.querySelectorAll('.nav_container').forEach(container => {
                container.classList.remove('gray-bg');
            });

            // Obtener el contenedor 'nav_container' del elemento clickeado
            const navContainer = this.querySelector('.nav_container');

            // Agregar la clase 'gray-bg' al contenedor 'nav_container' del elemento clickeado
            navContainer.classList.add('gray-bg');
        });
    });

    let parametros = {
        recibirMensajeInicio: true
    };
    //Mostrar mensajes para usuarios.
    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaAdmin.php",
        //Metodo en que los va a recibir.
        type: "GET",
        dataType: "json",
        data: parametros,
        async: false,
        success: function (respuesta) {

            //Contenedor general de la pagina.
            let contenedor = document.querySelector("#contenedor");

            let parteSuperior = crearElemento("div", undefined, {
                class: "row"
            });

            //Busco el nombre del usuario.
            let nombreUsuario = JSON.parse(localStorage.getItem("usuario"));
            nombreUsuario = nombreUsuario.nombre;

            //Titulo de la pagina.
            let h1Inicio = crearElemento("h1", "Bienvenido, " + nombreUsuario, {
                id: "tituloApartado",
                class: "py-3 mb-3 mt-4"
            });

            parteSuperior.appendChild(h1Inicio);

            //Contenedor principal de los recuadros de los mensajes.
            let contenedorMensajes = crearElemento("div", undefined, {
                class: "row",
                id: "contenedorMensajes"
            });


            //Manejando la respuesta de la base de datos. Columnas recibidas "descripcion" - "fecha_mensaje"
            //Siempre se recibe el mas nuevo.
            let carta = crearElemento("div", undefined, {
                class: "col-4 d-flex justify-content-between"
            });

            let contenedorMensaje = crearElemento("div", undefined, {
                class: "card card_margin p-3 mensajesUser"
            });
            let contenedorMensajeTop = crearElemento('div', undefined, {
                class: "contenedorMensajeTop"
            });
            let contenedorMensajeBottom = crearElemento('div', undefined, {
                class: "contenedorMensajeBottom"
            });
            let tituloMensaje = crearElemento("h5", "Mensaje actual", {
                class: 'titulo_mensajeUser'
            });
            let fechaMensaje = crearElemento("p", respuesta.fecha_mensaje, {
                class: 'fecha_mensajeUser'
            });
            let contendorHoraLimite = crearElemento('div', undefined, {
                class: 'contendorHoraLimite'
            })
            let iconMensaje = crearElemento('i', undefined, {
                class: 'bi bi-stopwatch'
            })
            let horaLimite = crearElemento("p", respuesta.hora_limite, undefined);

            contendorHoraLimite.appendChild(iconMensaje);
            contendorHoraLimite.appendChild(horaLimite);

            let observaciones = crearElemento("p", respuesta.observaciones, undefined);

            contenedorMensajeTop.appendChild(tituloMensaje);
            contenedorMensajeTop.appendChild(fechaMensaje);
            contenedorMensajeBottom.appendChild(contendorHoraLimite);
            contenedorMensajeBottom.appendChild(observaciones);

            //Organizo los elementos y los agrego al div row.
            contenedorMensaje.appendChild(contenedorMensajeTop);
            contenedorMensaje.appendChild(contenedorMensajeBottom);
            carta.appendChild(contenedorMensaje);
            contenedorMensajes.appendChild(carta);

            //Seccion del input para el mensaje nuevo.

            carta = crearElemento("div", undefined, {
                class: "col-8 d-flex justify-content-between"
            });

            contenedorMensaje = crearElemento("div", undefined, {
                class: "card card_margin p-3 mensajesUser"
            });
            contenedorMensajeTop = crearElemento('div', undefined, {
                class: "contenedorMensajeTop"
            });
            contenedorMensajeBottom = crearElemento('div', undefined, {
                class: "contenedorMensajeBottom"
            });
            tituloMensaje = crearElemento("h5", "Nuevo mensaje", {
                class: 'titulo_mensajeUser'
            });
            fechaMensaje = crearElemento("p", obtenerFechaActual(), {
                class: 'fecha_mensajeUser'
            });
            contendorHoraLimite = crearElemento('div', undefined, {
                class: 'contendorHoraLimite'
            })
            iconMensaje = crearElemento('i', undefined, {
                class: 'bi bi-stopwatch'
            })

            let labelHoralimite = crearElemento("label", "Hora limite para la solicitud: ", {
                for: "contenidoHoraLimiteNueva"
            })

            horaLimite = crearElemento("input", undefined, {
                id: "contenidoHoraLimiteNueva",
                placeholder: "Nueva hora limite"
            });

            contendorHoraLimite.appendChild(iconMensaje);
            contendorHoraLimite.appendChild(labelHoralimite);
            contendorHoraLimite.appendChild(horaLimite);

            let labelMensajeNuevo = crearElemento("label", "Mensaje nuevo: ", {
                for: "mensajeNuevo"
            })

            observaciones = crearElemento("textarea", undefined, {
                id: "mensajeNuevo",
                placeholder: "Mensaje nuevo."
            });

            let botonEnviarMensaje = crearElemento("button", "Enviar", {
                id: "botonEnviarMensaje",
                class: "n btn_custom_1"
            });

            botonEnviarMensaje.addEventListener("click", enviarMensaje);

            contenedorMensajeTop.appendChild(tituloMensaje);
            contenedorMensajeTop.appendChild(fechaMensaje);
            contenedorMensajeBottom.appendChild(contendorHoraLimite);
            contenedorMensajeBottom.appendChild(labelMensajeNuevo);
            contenedorMensajeBottom.appendChild(observaciones);
            contenedorMensajeBottom.appendChild(botonEnviarMensaje);

            //Organizo los elementos y los agrego al div row.
            contenedorMensaje.appendChild(contenedorMensajeTop);
            contenedorMensaje.appendChild(contenedorMensajeBottom);
            carta.appendChild(contenedorMensaje);
            contenedorMensajes.appendChild(carta);

            //Agrego el div con la lista de cartas al contenedor superior de la pagina.
            parteSuperior.appendChild(contenedorMensajes);

            //Agrego el contenedor superior a la pagina.
            contenedor.appendChild(parteSuperior);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });


}

// MANEJADORES COMUNES DE FORMULARIOS PARA BOTONES.........................................
function limpiarDatos() {
    let formualario = document.getElementById("formulario");
    formualario.reset();
}

function cancelar() {
    pagInicio();
}

// Apartado INICIO____________________________________________________________________
function navInicio() {
    pagInicio();
}

function pagInicio() {
    window.location.replace("../administrador/inicioAdmin.html");
}

// Apartado CATEGORÍAS________________________________________________________________
function navListarCategorias() {
    pagListarCategorias();

    let parametros = {
        categorias: 'categorias'
    };

    $.ajax({
        type: "POST",
        url: "./php/consultaAdmin.php",
        data: parametros,
        async: false,
        success: tablaCategorias,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function pagListarCategorias() { // mostrar tabla con todas las categorías y sus datos
    // Contenido para la parte superior
    let tituloPagina = "Categorías";
    let contenidoSuperior = crearElemento("div", undefined, {
        class: "row contenidoSuperior"
    });

    // Contenido para la parte inferior
    let contenidoInferior = document.createElement("div", undefined, {
        id: 'row contenidoInferior',
        class: 'contenidoInferior'
    });

    // Crear la plantilla genérica
    crearPlantillaGenerica1(tituloPagina, contenidoSuperior, contenidoInferior);
}

function navAñadirCategoria() {
    pagAñadirCategoria();

    let parametros = {
        categorias: 'categorias'
    };
    console.log(parametros);

    $.ajax({
        type: "POST",
        url: "./php/consultaAdmin.php",
        data: parametros,
        async: false,
        success: tablaCategoriasSimplificada,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function tablaCategorias(respuesta) {
    let categorias = JSON.parse(respuesta);

    //Buscador.
    let buscador = crearElemento("input", undefined, {
        id: "buscadorCategorias"
    });

    buscador.addEventListener("input", function (e) {
        // Convertir a minúsculas y quitar espacios en blanco al inicio y al final.
        let textoBuscar = this.value.toLowerCase().trim();

        // Obtener todas las filas de la tabla.
        let filasTabla = tablaBody.querySelectorAll("tr");

        // Mostrar u ocultar según el texto del buscador.
        filasTabla.forEach(fila => {
            // Solo se va a buscar por nombre de categoria, se seleccionan solo las columnas correspondientes.
            let nombreCategoria = fila.querySelector("td:nth-child(2)").innerHTML.toLowerCase();

            // Mostrar la fila si coincide con el texto buscado o si no se ha ingresado nada en el input.
            if (nombreCategoria.includes(textoBuscar) || textoBuscar === "") {
                fila.style.display = ""; // Mostrar la fila.
            } else {
                fila.style.display = "none"; // Ocultar la fila.
            }
        });
    });

    contenedor.appendChild(buscador);

    //Estructura del titulo de la tabla.
    let tablaCategorias = crearElemento("table", undefined, {
        class: "table table-responsive table-hover mt-4"
    });
    let titulosTabla = crearElemento("thead");

    let filaTitulos = crearElemento("tr");
    let titulos = ["id_categorias", "descripcion", "imagenes", "observaciones"];
    for (let i = 0; i < titulos.length; i++) {
        let celdaTitulo = crearElemento("th", titulos[i].charAt(0).toUpperCase() + titulos[i].slice(1).toLowerCase());
        filaTitulos.appendChild(celdaTitulo);
    }
    let columnaDeBotones = crearElemento("td");
    filaTitulos.appendChild(columnaDeBotones);
    titulosTabla.appendChild(filaTitulos);
    tablaCategorias.appendChild(titulosTabla);

    //Estructura del cuerpo de la tabla.
    tablaBody = crearElemento("tbody");

    categorias.forEach(categoria => {
        let filaBody = crearElemento("tr", undefined, {
            id: "idcategoria_" + categoria["id_categorias"]
        });
        for (let i = 0; i < titulos.length; i++) {
            if (titulos[i] == "imagenes") {
                let celdaBody = crearElemento("td");
                let imagenCategoria = crearElemento("img", undefined, {
                    src: "../../../assets/img/categorias/" + categoria[titulos[i]]
                })
                celdaBody.appendChild(imagenCategoria);
                filaBody.appendChild(celdaBody);
            } else {
                let celdaBody = crearElemento("td", categoria[titulos[i]]);
                filaBody.appendChild(celdaBody);
            }
        }
        //Botones editar/borrar.
        let celdaBodyBoton = crearElemento("td");

        let editar = crearElemento('input', undefined, {
            id: "botonEditarCategoria_" + categoria["id_categorias"],
            type: "submit",
            value: "Editar"
        })
        let borrar = crearElemento('input', undefined, {
            id: "botonBorrarCategoria_" + categoria["id_categorias"],
            type: "submit",
            value: "Borrar"
        })
        celdaBodyBoton.appendChild(editar);
        celdaBodyBoton.appendChild(borrar);

        filaBody.appendChild(celdaBodyBoton);
        tablaBody.appendChild(filaBody);
    });
    tablaCategorias.appendChild(tablaBody);
    contenedor.appendChild(tablaCategorias);
}

function tablaCategoriasSimplificada(respuesta) {
    let categorias = JSON.parse(respuesta);
    let contenedor = document.querySelector(".pagForm_columnaRight");
    //Buscador.
    let buscador = crearElemento("input", undefined, {
        id: "buscadorCategorias"
    });

    buscador.addEventListener("input", function (e) {
        // Convertir a minúsculas y quitar espacios en blanco al inicio y al final.
        let textoBuscar = this.value.toLowerCase().trim();

        // Obtener todas las filas de la tabla.
        let filasTabla = tablaBody.querySelectorAll("tr");

        // Mostrar u ocultar según el texto del buscador.
        filasTabla.forEach(fila => {
            // Solo se va a buscar por nombre de categoria, se seleccionan solo las columnas correspondientes.
            let nombreCategoria = fila.querySelector("td:nth-child(2)").innerHTML.toLowerCase();

            // Mostrar la fila si coincide con el texto buscado o si no se ha ingresado nada en el input.
            if (nombreCategoria.includes(textoBuscar) || textoBuscar === "") {
                fila.style.display = ""; // Mostrar la fila.
            } else {
                fila.style.display = "none"; // Ocultar la fila.
            }
        });
    });

    contenedor.appendChild(buscador);

    //Estructura del titulo de la tabla.
    let tablaCategorias = crearElemento("table", undefined, {
        class: "table table-responsive table-hover mt-4"
    });
    let titulosTabla = crearElemento("thead");

    let filaTitulos = crearElemento("tr");
    let titulos = ["imagenes", "descripcion"];
    for (let i = 0; i < titulos.length; i++) {
        let celdaTitulo = crearElemento("th", titulos[i].charAt(0).toUpperCase() + titulos[i].slice(1).toLowerCase());
        filaTitulos.appendChild(celdaTitulo);
    }
    titulosTabla.appendChild(filaTitulos);
    tablaCategorias.appendChild(titulosTabla);

    //Estructura del cuerpo de la tabla.
    tablaBody = crearElemento("tbody");

    categorias.forEach(categoria => {
        let filaBody = crearElemento("tr", undefined, {
            id: "idcategoria_" + categoria["id_categorias"]
        });
        for (let i = 0; i < titulos.length; i++) {
            if (titulos[i] == "imagenes") {
                let celdaBody = crearElemento("td");
                let imagenCategoria = crearElemento("img", undefined, {
                    src: "../../../assets/img/categorias/" + categoria[titulos[i]]
                })
                celdaBody.appendChild(imagenCategoria);
                filaBody.appendChild(celdaBody);
            } else {
                let celdaBody = crearElemento("td", categoria[titulos[i]]);
                filaBody.appendChild(celdaBody);
            }
        }
        tablaBody.appendChild(filaBody);
    });
    tablaCategorias.appendChild(tablaBody);
    contenedor.appendChild(tablaCategorias);
}

// Formulario 1. Crear categorías...................
function pagAñadirCategoria() {
    crearPlantillaFormularios('Nueva categoría', 'Datos de la nueva categoría', 'Categorías existentes');
    let contenedorForm = document.querySelector('#contenedorForm');

    let formCategorias = crearElemento('form', undefined, []);

    let contenedorFormTop = crearElemento('div', undefined, { // van el contenedor left y right
        class: 'form_contenedor_top'
    });

    let contenedorFormLeft = crearElemento('div', undefined, { // columna izquierda del formulario
        class: 'form_contenedor_left'
    });

    let contenedorFormRight = crearElemento('div', undefined, { // columna derecha del formulario
        class: 'form_contenedor_right'
    });

    //. BLOQUE 1....................................................
    let contenedorImagen = crearElemento('div', undefined, {
        class: 'form-group w-100 form_cat_contenedor_imagen'
    });

    let labelImagen = crearElemento('label', 'Icono de categoría', {
        for: 'iconoCategoriaForm',
        class: 'form-label'
    });
    contenedorImagen.appendChild(labelImagen);

    let contenedorImagenSeleccionar = crearElemento('div', undefined, {
        id: 'contenedorImagenSeleccionar',
        class: 'dropdown contenedorImagenCategoria'
    });
    let etiquetaEnlace = crearElemento('a', undefined, {
        href: '#',
        role: 'button',
        id: 'dropdownImgCategoria',
        class: 'etiqueta_enlace_categoria',
        'data-bs-toggle': 'dropdown',
        'aria-expanded': 'false'
    });
    let imagenCategoriaContenedor = crearElemento('div', undefined, {
        id: 'imagenCategoriaContenedor',
        class: 'imagenCategoriaContenedor'
    })
    let iconSeleccionarImg = crearElemento('i', undefined, { // por defecto aparece un + 
        class: 'bi bi-xbi bi-plus-lg'
    });

    imagenCategoriaContenedor.appendChild(iconSeleccionarImg);
    etiquetaEnlace.appendChild(imagenCategoriaContenedor);

    let contenedorGaleriaImg = crearElemento('div', undefined, {
        class: 'new_img_categoria_container dropdown-menu'
    });
    let estructuraGridGaleria = crearElemento('div', undefined, {
        class: 'card img_categoria_grid'
    })

    let imagenCategoria = crearElemento('img', undefined, {
        id: 'imagenSeleccionada',
        alt: 'Imagen de categoría'
    });

    // Mostrar imágenes en el select para seleccionar.......................................
    // Ruta de la carpeta de imágenes
    let rutaCarpeta = "../../../assets/img/categorias/";

    // Número de imágenes
    let numeroImagenes = 26;
    let imgItemDropdown = '';

    // Crear las opciones del desplegable con las imágenes
    for (let i = 1; i <= numeroImagenes; i++) {
        // Generar el nombre de archivo de la imagen
        let nombreImagen = i + ".png";

        // Eliminar los últimos cuatro caracteres (".png") del nombre de la imagen
        let nombreImagenSinExtension = nombreImagen.slice(0, -4);

        imgItemDropdown = crearElemento('a', undefined, {
            id: 'dropdown-item',
            href: '#'
        });

        // Crear y agregar la opción al desplegable
        let imgCategoriaDropdown = crearElemento("img", undefined, {
            id: 'img_' + nombreImagenSinExtension,
            class: 'img_dropdown_categoria',
            src: rutaCarpeta + nombreImagen,
            alt: nombreImagenSinExtension
        });
        imgCategoriaDropdown.addEventListener("click", function () {
            imagenCategoria.src = rutaCarpeta + nombreImagen;
        });
        imgItemDropdown.appendChild(imgCategoriaDropdown);
        estructuraGridGaleria.appendChild(imgItemDropdown);
    }
    let imagenes = estructuraGridGaleria.querySelectorAll("img");
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener("click", function (e) {
            let textoDividido = this.id.split("_");
            let imagenSeleccioanda = parseInt(textoDividido[1]);

            imagenCategoriaContenedor.innerHTML = "";
            //Se cambia el color de fondo a transparente.
            imagenCategoriaContenedor.style.backgroundColor = "#fff0";
            let imagenNueva = crearElemento("img", undefined, {
                src: "../../../assets/img/categorias/" + imagenSeleccioanda + ".png"
            })
            imagenCategoriaContenedor.appendChild(imagenNueva);
        });
    }

    // Cambiar la imagen seleccionada cuando se elija una opción del desplegable
    imagenCategoriaContenedor.addEventListener("change", function () {
        let rutaImagenSeleccionada = imagenCategoriaContenedor.value;
        imagenCategoria.src = rutaImagenSeleccionada;
    });

    // imgItemDropdown.appendChild(imagenCategoria); 
    estructuraGridGaleria.appendChild(imgItemDropdown);
    contenedorGaleriaImg.appendChild(estructuraGridGaleria);

    contenedorImagenSeleccionar.appendChild(etiquetaEnlace);
    contenedorImagenSeleccionar.appendChild(contenedorGaleriaImg);

    contenedorImagen.appendChild(contenedorImagenSeleccionar);
    contenedorFormLeft.appendChild(contenedorImagen);

    //. BLOQUE 2....................................................
    let contenedorNombre = crearElemento('div', undefined, {
        class: 'form-group w-100 form_cat_contenedor_nombre'
    });

    let labelNombre = crearElemento('label', 'Nombre', {
        for: 'newCategoriaName',
        class: 'form-label'
    });
    contenedorNombre.appendChild(labelNombre);

    let inputNombre = crearElemento('input', undefined, {
        type: 'text',
        id: 'newCategoriaName',
        class: 'form-control',
        placeholder: 'Nombre de la nueva categoría'
    });
    contenedorNombre.appendChild(inputNombre);

    contenedorFormLeft.appendChild(contenedorNombre); // añadir a la columna izquierda del contendor

    //. BLOQUE 3....................................................
    let contenedorObservaciones = crearElemento('div', undefined, {
        class: 'form-group w-100 form_cat_contenedor_obser'
    });

    let labelObservaciones = crearElemento('label', 'Observaciones', {
        for: 'newObservacionCategoria',
        class: 'form-label'
    });
    contenedorObservaciones.appendChild(labelObservaciones);

    let inputObservaciones = crearElemento('textarea', undefined, {
        type: 'text',
        id: 'newObservacionCategoria',
        class: 'form-control',
        placeholder: 'Observaciones de la nueva categoría',
        rows: '5',
    });
    contenedorObservaciones.appendChild(inputObservaciones);

    contenedorFormLeft.appendChild(contenedorObservaciones);  // añadir a la columna izquierda del contenedor 

    //. BLOQUE 4....................................................
    let contenedorBuscarProductos = crearElemento('div', undefined, {
        class: 'form-group form_cat_contenedor_buscarProd w-100'
    });

    let contenedorBuscador = crearElemento("div", undefined, {
        id: "contenedorBuscador",
        class: "contenedorBuscador input-group"
    });

    let contenedorBuscadorIcon = crearElemento("div", undefined, {
        id: "contenedorBuscadorIcon",
        class: "contenedorBuscadorIcon input-group-prepend input-group"
    });

    let contenedorIconBuscador = crearElemento("span", undefined, {
        class: "input-group-text"
    });

    let iconBuscador = crearElemento("i", undefined, {
        class: "bi bi-search"
    });

    contenedorIconBuscador.appendChild(iconBuscador);
    contenedorBuscadorIcon.appendChild(contenedorIconBuscador);
    contenedorBuscador.appendChild(contenedorBuscadorIcon);

    let labelProductosCategoria = crearElemento('label', 'Productos de la categoría', {
        for: 'filtroBuscadorNombre',
        class: 'form-label'
    });

    let inputNombreProducto = crearElemento("input", undefined, {
        id: "filtroBuscadorNombre",
        type: "text",
        placeholder: "Agregar productos a la categoría...",
        class: "form-control filtroBuscador"
    });

    contenedorBuscadorIcon.appendChild(inputNombreProducto);
    contenedorBuscarProductos.appendChild(labelProductosCategoria);

    contenedorBuscarProductos.appendChild(contenedorBuscadorIcon);

    contenedorFormRight.appendChild(contenedorBuscarProductos);

    //. BOTONES......................................................
    let contenedorBotones = crearElemento('div', undefined, {
        class: 'form-group form_contenedor_botones'
    });

    let btnCancelar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Cancelar',
        class: 'btn btn_custom_3',
        onclick: 'cancelar()'
    });

    let btnVaciar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Limpiar datos',
        class: 'btn btn_custom_2',
        onclick: 'limpiarDatos()'
    });

    let btnCrearCategoria = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Crear categoría',
        class: 'btn btn_custom_1',
        onclick: 'crearCategoria()'
    });

    contenedorBotones.appendChild(btnCancelar);
    contenedorBotones.appendChild(btnVaciar);
    contenedorBotones.appendChild(btnCrearCategoria);

    contenedorFormTop.appendChild(contenedorFormLeft);
    contenedorFormTop.appendChild(contenedorFormRight);

    formCategorias.appendChild(contenedorFormTop);
    formCategorias.appendChild(contenedorBotones);

    contenedorForm.appendChild(formCategorias);
}

function newCategoria() {
    let nombre = document.getElementById('newCategoriaName').value;
    let observaciones = document.getElementById('newObservacionCategoria').value;

    let parametros = {
        NewCategoria: JSON.stringify({
            descripcion: nombre,
            observaciones: observaciones
        })
    };
    console.log(parametros);

    $.ajax({
        type: "POST",
        url: "./php/consultaAdmin.php",
        data: parametros,
        error: function (a, b, errorMsg) {
            console.log(errorMsg);
        }
    }).done(function (a) {
        console.log(a);
        console.log("hecho");
    });
}

// Apartado PRODUCTOS__________________________________________________________________
function navProductos() {
    navListarProductos();
}

function navListarProductos() {
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

function pagListarProductos(respuesta) {
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

        filaBody.addEventListener("click", manejadorProductoPopup);

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

                if (index === 0) {
                    celdaBody.classList.add("tabla_nombreLargo");
                }

                if (index === 1) {
                    celdaBody.classList.add("tabla_nombreLargo");

                    let imagenCategoria = crearElemento("img", undefined, {
                        src: `../../../assets/img/categorias/${todosProductos[i]["imagen_categoria"]}`,
                        width: "35px",
                    });
                    celdaBody.appendChild(imagenCategoria);
                }


                celdaBody.innerHTML += dato;

                filaBody.appendChild(celdaBody);

                // Verificar si la celda actual es para la columna de observaciones
                if (index === 3) {
                    celdaBody.classList.add("tabla_observaciones");
                }
            });

            //Los id de los botones concuerdan con la posicion del producto en el array.
            //Esto se va a utilizar para identificar que producto esta en cada boton.
            let celdaBoton = crearElemento("td", undefined, {
                class: "td_alignRight"
            });
            let botonEditar = crearElemento("i", undefined, {
                id: "botonEditar_" + i,
                class: "bi bi-pencil-square",
            });
            let botonBorrar = crearElemento("i", undefined, {
                id: "botonBorrar_" + i,
                class: "bi bi-trash3",
            })
            // botonAñadir.addEventListener("click", agregarCesta);
            // botonAñadir.addEventListener("click", manejadorCarrito);
            celdaBoton.appendChild(botonEditar);
            celdaBoton.appendChild(botonBorrar);
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
        let botonMensajeVacio = document.querySelector("#botonMensajeVacio");
        // botonMensajeVacio.addEventListener("click", manejadorSolicitud);
    }
}

// function manejadorProductoPopup(e) {


//     crearPopup("Vista previa de "+ nombreProducto);
//     let contenedorPopup = document.querySelector('#contenedorPopup');
//     let contenidoFila = this.querySelectorAll("td");

//     let nombreProducto = contenidoFila[1].innerHTML;
//     let categoriaFila = contenidoFila[2].innerHTML;
//     let unidades = contenidoFila[3].innerHTML;
//     let observaciones = contenidoFila[4].innerHTML;

// }

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

    let contenedorFiltroLabelySelect = crearElemento("div", undefined, { // contiene el div contenedorFiltroLabel y contenedorFiltroLeft
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

    let contenedorFiltroLeft = crearElemento("div", undefined, {
        id: "contenedorFiltroLeft",
        class: "contenedorFiltroLeft"
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

    contenedorFiltroLeft.appendChild(selectCategoria);

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
    contenedorFiltroLeft.appendChild(selectUnidades);

    contenedorFiltroLabelySelect.appendChild(contenedorFiltroLabel);
    contenedorFiltroLabelySelect.appendChild(contenedorFiltroLeft);

    contenedorFiltro.appendChild(contenedorFiltroLabelySelect);

    let contenedorFiltroRight = crearElemento("div", undefined, {
        id: "contenedorFiltroRight",
        class: "contenedorFiltroRight"
    });

    let contenedorBuscador = crearElemento("div", undefined, {
        id: "contenedorBuscador",
        class: "contenedorBuscador input-group"
    });

    let contenedorBuscadorIcon = crearElemento("div", undefined, {
        id: "contenedorBuscadorIcon",
        class: "contenedorBuscadorIcon input-group-prepend input-group"
    });

    let contenedorIconBuscador = crearElemento("span", undefined, {
        class: "input-group-text searchbar"
    });

    let iconBuscador = crearElemento("i", undefined, {
        class: "bi bi-search"
    });

    contenedorIconBuscador.appendChild(iconBuscador);
    contenedorBuscadorIcon.appendChild(contenedorIconBuscador);
    contenedorBuscador.appendChild(contenedorBuscadorIcon);

    // Crear el campo de texto para el nombre
    let inputNombre = crearElemento("input", undefined, {
        id: "filtroBuscadorNombre",
        type: "text",
        placeholder: "Buscar por nombre de producto...",
        class: "form-control searchbar filtroBuscador",
        value: nombre || ""
    });

    let botonNuevoProducto = crearElemento("input", undefined, {
        type: "submit",
        id: "botonNuevoProducto",
        class: "btn btn_custom_1",
        value: "Nuevo producto",
    });

    // botonNuevoProducto.addEventListener("click", manejadorSolicitud);

    inputNombre.addEventListener("input", manejadorFiltro);
    contenedorBuscadorIcon.appendChild(inputNombre);
    contenedorFiltroRight.appendChild(contenedorBuscador);
    contenedorFiltroRight.appendChild(botonNuevoProducto);

    contenedorFiltro.appendChild(contenedorFiltroRight);

    // Añadir el contenedor del filtro al DOM
    parteInferior.appendChild(contenedorFiltro);
}

function navAñadirProducto() {
    pagAñadirProducto();
}

// Formulario 2. Crear producto.......................
function pagAñadirProducto() {
    crearPlantillaFormularios('Nuevo producto', 'Datos del nuevo producto', 'Productos existentes');
    let contenedorForm = document.querySelector('#contenedorForm');

    let formProductos = crearElemento('form', undefined, []);

    let contenedorFormTop = crearElemento('div', undefined, { // van el contenedor left y right
        class: 'form_contenedor_top'
    });

    let contenedorFormLeft = crearElemento('div', undefined, { // columna izquierda del formulario
        class: 'form_contenedor_left'
    });

    let contenedorFormRight = crearElemento('div', undefined, { // columna derecha del formulario
        class: 'form_contenedor_right'
    });

    //. BLOQUE 1....................................................
    let contenedorNombre = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelNombre = crearElemento('label', 'Nombre', {
        for: 'newNombreProducto',
        class: 'form-label'
    });
    contenedorNombre.appendChild(labelNombre);

    let inputNombre = crearElemento('input', undefined, {
        type: 'text',
        id: 'newNombreProducto',
        class: 'form-control',
        placeholder: 'Nombre del nuevo producto'
    });
    contenedorNombre.appendChild(inputNombre);

    contenedorFormLeft.appendChild(contenedorNombre);

    //. BLOQUE 2....................................................
    let contenedorUdMedida = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelUdMedida = crearElemento('label', 'Ud. de medida', {
        for: 'newProductUdMedida',
        class: 'form-label'
    });
    contenedorUdMedida.appendChild(labelUdMedida);

    let inputUdMedida = crearElemento('input', undefined, {
        type: 'text',
        id: 'newProductUdMedida',
        class: 'form-control',
        placeholder: 'Ud. de medida del producto'
    });
    contenedorUdMedida.appendChild(inputUdMedida);

    contenedorFormLeft.appendChild(contenedorUdMedida);

    //. BLOQUE 3....................................................
    let contenedorObservaciones = crearElemento('div', undefined, {
        class: 'form-group w-100 form_cat_contenedor_obser'
    });

    let labelObservaciones = crearElemento('label', 'Observaciones', {
        for: 'newProductObservaciones',
        class: 'form-label'
    });
    contenedorObservaciones.appendChild(labelObservaciones);

    let inputObservaciones = crearElemento('textarea', undefined, {
        type: 'text',
        id: 'newProductObservaciones',
        class: 'form-control',
        placeholder: 'Observaciones del nuevo producto',
        rows: '5',
    });
    contenedorObservaciones.appendChild(inputObservaciones);

    contenedorFormLeft.appendChild(contenedorObservaciones);

    //. BLOQUE 4....................................................
    let contenedorCategoria = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelCategoria = crearElemento('label', 'Categoría', {
        for: 'newProductCategoria',
        class: 'form-label'
    });
    contenedorCategoria.appendChild(labelCategoria);

    let inputCategoria = crearElemento('input', undefined, {
        type: 'text',
        id: 'newProductCategoria',
        class: 'form-control',
        placeholder: 'Categoría del producto'
    });
    contenedorCategoria.appendChild(inputCategoria);

    contenedorFormRight.appendChild(contenedorCategoria);

    //. BLOQUE 5....................................................
    let contenedorResiduos = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelResiduos = crearElemento('label', 'Residuos', {
        for: 'newProductResiduos',
        class: 'form-label'
    });
    contenedorResiduos.appendChild(labelResiduos);

    let inputResiduos = crearElemento('input', undefined, {
        type: 'text',
        id: 'newProductResiduos',
        class: 'form-control',
        placeholder: 'Residuos del producto'
    });
    contenedorResiduos.appendChild(inputResiduos);

    contenedorFormRight.appendChild(contenedorResiduos);

    //. BOTONES......................................................
    let contenedorBotones = crearElemento('div', undefined, {
        class: 'form-group form_contenedor_botones'
    });

    let btnCancelar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Cancelar',
        class: 'btn btn_custom_3',
        onclick: 'cancelar()'
    });

    let btnVaciar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Limpiar datos',
        class: 'btn btn_custom_2',
        onclick: 'limpiarDatos()'
    });

    let btnCrearProducto = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Crear producto',
        class: 'btn btn_custom_1',
        onclick: 'crearProducto()'
    });

    contenedorBotones.appendChild(btnCancelar);
    contenedorBotones.appendChild(btnVaciar);
    contenedorBotones.appendChild(btnCrearProducto);

    contenedorFormTop.appendChild(contenedorFormLeft);
    contenedorFormTop.appendChild(contenedorFormRight);

    formProductos.appendChild(contenedorFormTop);
    formProductos.appendChild(contenedorBotones);

    contenedorForm.appendChild(formProductos);
}

// Formulario 3. Crear ud. de medida...................
function navUdMedida() {
    pagUdMedida();

    let parametros = {
        unidadesDeMedida: 'unidadesMedida'
    };
    console.log(parametros);

    $.ajax({
        type: "POST",
        url: "./php/consultaAdmin.php",
        data: parametros,
        async: false,
        success: tablaUnidadesMedida,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}
//Función que imprime la tabla de Unidades de Medida
function tablaUnidadesMedida(respuesta) {
    //Datos de unidades recibidos: "id_unidades" - "descripcion" - "observaciones"
    let unidades = JSON.parse(respuesta);

    //La parte derecha del formulario, falta darle un id,
    let contenedorDerecho = document.querySelector(".pagForm_columnaRight");
    let buscador = crearElemento("input", undefined, {
        id: "buscadorFormDerecho"
    });

    buscador.addEventListener("input", function (e) {
        // Convertir a minúsculas y quitar espacios en blanco al inicio y al final.
        let textoBuscar = this.value.toLowerCase().trim();

        // Obtener todas las filas de la tabla.
        let filasTabla = tablaBody.querySelectorAll("tr");

        // Mostrar u ocultar según el texto del buscador.
        filasTabla.forEach(fila => {
            // Obtener la descripción de la fila y convertirla a minúsculas.
            let descripcion = fila.querySelector("td").innerHTML.toLowerCase();

            // Mostrar la fila si coincide con el texto buscado o si no se ha ingresado nada en el input.
            if (descripcion.includes(textoBuscar) || textoBuscar === "") {
                fila.style.display = ""; // Mostrar la fila.
            } else {
                fila.style.display = "none"; // Ocultar la fila.
            }
        });
    });

    contenedorDerecho.appendChild(buscador);

    //Tabla.
    let tablaUnidades = crearElemento("table", undefined, {
        class: "table table-responsive table-hover mt-4"
    });

    let tablaBody = crearElemento("tbody");
    //Ahora agrego el contenido.
    unidades.forEach(fila => {
        let filaBody = crearElemento("tr");
        let celdaDescripcion = crearElemento("td", fila["descripcion"]);
        let celdaBotones = crearElemento("td");

        // Crear el div principal con la clase dropdown
        let divDropdown = crearElemento("div", undefined, {
            class: "dropdown"
        });

        // Crear el enlace con los atributos y contenido dados
        let enlace = crearElemento("a", undefined, {
            href: "#",
            role: "button",
            id: "unidadDropdown_" + fila.id_unidades,
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false"
        });

        // Crear el contenedor del icono
        let iconContainer = crearElemento("div", undefined, { class: "icon_container" });

        // Crear el icono principal
        let iconoPrincipal = crearElemento("i", undefined, { id: "iconoPrincipal_" + fila.id_unidades, class: "bi bi-three-dots-vertical" });

        // Agregar el icono principal al contenedor de iconos
        iconContainer.appendChild(iconoPrincipal);

        // Agregar el contenedor de iconos al enlace
        enlace.appendChild(iconContainer);

        // Crear el div del menú desplegable con los atributos dados
        let divDropdownMenu = crearElemento("div", undefined, { class: "dropdown-menu", "aria-labelledby": "unidadDropdown_" + fila.id_unidades });

        // Crear los elementos de las opciones del menú desplegable
        let opcionModificar = crearElemento("a", undefined, { class: "dropdown-item", href: "#" });
        let iconoModificar = crearElemento("span", undefined, { class: "bi bi-pencil dropdown_icon_margin" });
        let textoModificar = crearElemento("span", "Editar");
        opcionModificar.appendChild(iconoModificar);
        opcionModificar.appendChild(textoModificar);

        let opcionEliminar = crearElemento("a", undefined, { class: "dropdown-item", href: "#" });
        let iconoEliminar = crearElemento("span", undefined, { class: "bi bi-trash3 dropdown_icon_margin" });
        let textoEliminar = crearElemento("span", "Eliminar");
        opcionEliminar.appendChild(iconoEliminar);
        opcionEliminar.appendChild(textoEliminar);

        // Agregar las opciones al div del menú desplegable
        divDropdownMenu.appendChild(opcionModificar);
        divDropdownMenu.appendChild(opcionEliminar);

        // Agregar el enlace y el menú desplegable al div principal
        divDropdown.appendChild(enlace);
        divDropdown.appendChild(divDropdownMenu);

        // Agregar el div principal a la celda de botones
        celdaBotones.appendChild(divDropdown);

        filaBody.appendChild(celdaDescripcion);
        filaBody.appendChild(celdaBotones);
        tablaBody.appendChild(filaBody);
    });
    tablaUnidades.appendChild(tablaBody);
    contenedorDerecho.appendChild(tablaUnidades);
}

function pagUdMedida() {
    crearPlantillaFormularios('Nueva unidad de medida', 'Datos de la nueva ud. de medida', 'Ud. de medida existentes');
    let contenedorForm = document.querySelector('#contenedorForm');

    let formUdMedida = crearElemento('form', undefined, []);

    let contenedorFormTop = crearElemento('div', undefined, { // van el contenedor left y right
        class: 'form_contenedor_top'
    });

    let contenedorFormLeft = crearElemento('div', undefined, { // columna izquierda del formulario
        class: 'form_contenedor_left'
    });

    let contenedorFormRight = crearElemento('div', undefined, { // columna derecha del formulario
        class: 'form_contenedor_right'
    });

    //. BLOQUE 1....................................................
    let contenedorNombre = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelNombre = crearElemento('label', 'Nombre', {
        for: 'newUdMedidaName',
        class: 'form-label'
    });
    contenedorNombre.appendChild(labelNombre);

    let inputNombre = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUdMedidaName',
        class: 'form-control',
        placeholder: 'Nombre de la nueva ud. de medida'
    });
    contenedorNombre.appendChild(inputNombre);

    contenedorFormLeft.appendChild(contenedorNombre);

    //. BLOQUE 2....................................................
    let contenedorObservaciones = crearElemento('div', undefined, {
        class: 'form-group w-100 form_cat_contenedor_obser'
    });

    let labelObservaciones = crearElemento('label', 'Observaciones', {
        for: 'newUdMedidaObservaciones',
        class: 'form-label'
    });
    contenedorObservaciones.appendChild(labelObservaciones);

    let inputObservaciones = crearElemento('textarea', undefined, {
        type: 'text',
        id: 'newUdMedidaObservaciones',
        class: 'form-control',
        placeholder: 'Observaciones de la nueva ud. de medida',
        rows: '5',
    });
    contenedorObservaciones.appendChild(inputObservaciones);

    contenedorFormRight.appendChild(contenedorObservaciones);

    //. BOTONES......................................................
    let contenedorBotones = crearElemento('div', undefined, {
        class: 'form-group form_contenedor_botones'
    });

    let btnCancelar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Cancelar',
        class: 'btn btn_custom_3',
        onclick: 'cancelar()'
    });

    let btnVaciar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Limpiar datos',
        class: 'btn btn_custom_2',
        onclick: 'limpiarDatos()'
    });

    let btnCrearMedida = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Crear ud. de medida',
        class: 'btn btn_custom_1',
        onclick: 'btnCrearMedida()'
    });

    contenedorBotones.appendChild(btnCancelar);
    contenedorBotones.appendChild(btnVaciar);
    contenedorBotones.appendChild(btnCrearMedida);

    contenedorFormTop.appendChild(contenedorFormLeft);
    contenedorFormTop.appendChild(contenedorFormRight);

    formUdMedida.appendChild(contenedorFormTop);
    formUdMedida.appendChild(contenedorBotones);

    contenedorForm.appendChild(formUdMedida);
}

function newUdMedida() {
    let nombre = document.getElementById('newUdMedidaName').value;
    let observaciones = document.getElementById('newUdMedidaObservaciones').value;

    let parametros = {
        NewUnidadMedida: JSON.stringify({
            descripcion: nombre,
            observaciones: observaciones
        })
    };
    console.log(parametros);

    $.ajax({
        type: "POST",
        url: "./php/consultaAdmin.php",
        data: parametros,
        error: function (a, b, errorMsg) {
            console.log(errorMsg);
        }
    }).done(function (a) {
        console.log(a);
        console.log("hecho");
    });
}

// Apartado PEDIDOS____________________________________________________________________
function navPedidos() {
    navListarPedidos();
}

function navListarPedidos() {
    pagListarPedidos();
}

function pagListarPedidos() { // mostrar el historial de pedidos del admin
}

function navNuevoPedido() {
    pagNuevoPedido();
}

// Formulario 4. Nuevo pedido...........................
function pagNuevoPedido() {
}

// Apartado USUARIOS____________________________________________________________________
function tablaUsuarios(usuarios) {
    let contenedor = document.querySelector("#parteInferior");
    contenedor.innerHTML = "";

    //Buscador.
    let buscador = crearElemento("input", undefined, {
        id: "buscadorUsuarios"
    });

    buscador.addEventListener("input", function (e) {
        // Convertir a minúsculas y quitar espacios en blanco al inicio y al final.
        let textoBuscar = this.value.toLowerCase().trim();

        // Obtener todas las filas de la tabla.
        let filasTabla = tablaBody.querySelectorAll("tr");

        // Mostrar u ocultar según el texto del buscador.
        filasTabla.forEach(fila => {
            // Solo se va a buscar por nombre de usuario, nombre y apellidos, se seleccionan solo las columnas correspondientes.
            let nombreUsuario = fila.querySelector("td:nth-child(3)").innerHTML.toLowerCase();
            let nombre = fila.querySelector("td:nth-child(4)").innerHTML.toLowerCase();
            let apellido = fila.querySelector("td:nth-child(5)").innerHTML.toLowerCase();

            // Mostrar la fila si coincide con el texto buscado o si no se ha ingresado nada en el input.
            if (nombreUsuario.includes(textoBuscar) || nombre.includes(textoBuscar) || apellido.includes(textoBuscar) || textoBuscar === "") {
                fila.style.display = ""; // Mostrar la fila.
            } else {
                fila.style.display = "none"; // Ocultar la fila.
            }
        });
    });

    contenedor.appendChild(buscador);

    //Estructura del titulo de la tabla.
    let tablaUsuarios = crearElemento("table", undefined, {
        class: "table table-responsive table-hover mt-4"
    });
    let titulosTabla = crearElemento("thead");

    let filaTitulos = crearElemento("tr");
    let titulos = ["id_usuarios", "admin", "nombre_usuario", "nombre", "apellido", "email", "password", "activo", "observaciones", "telefono"];
    for (let i = 0; i < titulos.length; i++) {
        let celdaTitulo = crearElemento("th", titulos[i].charAt(0).toUpperCase() + titulos[i].slice(1).toLowerCase());
        filaTitulos.appendChild(celdaTitulo);
    }
    let columnaDeBotones = crearElemento("td");
    filaTitulos.appendChild(columnaDeBotones);
    titulosTabla.appendChild(filaTitulos);
    tablaUsuarios.appendChild(titulosTabla);

    //Estructura del cuerpo de la tabla.
    tablaBody = crearElemento("tbody");


    usuarios.forEach(usuario => {
        let filaBody = crearElemento("tr", undefined, {
            id: "idusuario_" + usuario["id_usuarios"]
        });
        for (let i = 0; i < titulos.length; i++) {
            let celdaBody = crearElemento("td", usuario[titulos[i]]);
            filaBody.appendChild(celdaBody);
        }
        //Botones editar/borrar.
        let celdaBodyBoton = crearElemento("td");

        let editar = crearElemento('input', undefined, {
            id: "botonEditarUsuario_" + usuario["id_usuarios"],
            type: "submit",
            value: "Editar"
        })
        let borrar = crearElemento('input', undefined, {
            id: "botonBorrarUsuario_" + usuario["id_usuarios"],
            type: "submit",
            value: "Borrar"
        })
        celdaBodyBoton.appendChild(editar);
        celdaBodyBoton.appendChild(borrar);

        filaBody.appendChild(celdaBodyBoton);
        tablaBody.appendChild(filaBody);
    });
    tablaUsuarios.appendChild(tablaBody);
    contenedor.appendChild(tablaUsuarios);
}

function navListarUsuarios() {
    pagListarUsuarios();

    let parametros = {
        claveTodosUsuarios: true
    };
    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaAdmin.php",
        //Metodo en que los va a recibir.
        type: "GET",
        data: parametros,
        dataType: "json",
        success: tablaUsuarios,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

function pagListarUsuarios() { // mostrar tabla con los usuarios y sus datos
    // Contenido para la parte superior
    let tituloPagina = "Usuarios";
    let contenidoSuperior = crearElemento("div", undefined, {
        class: "row contenidoSuperior",
        id: "categorias"
    });

    // Contenido para la parte inferior
    let contenidoInferior = document.createElement("div", undefined, {
        id: 'row contenidoInferior',
        class: 'contenidoInferior'
    });

    // Crear la plantilla genérica
    crearPlantillaGenerica1(tituloPagina, contenidoSuperior, contenidoInferior);
}

// Formulario 5. Añadir usuario.....................
function navAñadirUsuario() {
    pagAñadirUsuario();
}

function pagAñadirUsuario() {
    crearPlantillaFormularios('Nuevo usuario', 'Datos del nuevo usuario', 'Usuarios existentes');
    let contenedorForm = document.querySelector('#contenedorForm');

    let formUsuario = crearElemento('form', undefined, []);

    let contenedorFormTop = crearElemento('div', undefined, { // van el contenedor left y right
        class: 'form_contenedor_top'
    });

    let contenedorFormLeft = crearElemento('div', undefined, { // columna izquierda del formulario
        class: 'form_contenedor_left'
    });

    let contenedorFormRight = crearElemento('div', undefined, { // columna derecha del formulario
        class: 'form_contenedor_right'
    });

    //. BLOQUE 1....................................................
    let contenedorNombre = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelNombre = crearElemento('label', 'Nombre', {
        for: 'newUserName',
        class: 'form-label'
    });
    contenedorNombre.appendChild(labelNombre);

    let inputNombre = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUserName',
        class: 'form-control',
        placeholder: 'Nombre de la persona'
    });
    contenedorNombre.appendChild(inputNombre); 

    contenedorFormLeft.appendChild(contenedorNombre);

    //. BLOQUE 2....................................................
    let contenedorApellido = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelApellido = crearElemento('label', 'Apellido', {
        for: 'newUserApellido',
        class: 'form-label'
    });
    contenedorApellido.appendChild(labelApellido);

    let inputApellido = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUserApellido',
        class: 'form-control',
        placeholder: 'Apellido de la persona'
    });
    contenedorApellido.appendChild(inputApellido); 
    contenedorFormRight.appendChild(contenedorApellido);

    //. BLOQUE 3....................................................
    let contenedorUsername = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelUsername = crearElemento('label', 'Nombre de usuario', {
        for: 'newUsername',
        class: 'form-label'
    });
    contenedorUsername.appendChild(labelUsername);

    let inputUsername = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUsername',
        class: 'form-control',
        placeholder: 'Nombre de usuario'
    });
    contenedorUsername.appendChild(inputUsername); 
    contenedorFormLeft.appendChild(contenedorUsername);

    //. BLOQUE 4....................................................
    let contenedorPassword = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelPassword = crearElemento('label', 'Contraseña', {
        for: 'newUserPassword',
        class: 'form-label'
    });
    contenedorPassword.appendChild(labelPassword);

    let inputPassword = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUserPassword',
        class: 'form-control',
        placeholder: 'Contraseña del usuario'
    });
    contenedorPassword.appendChild(inputPassword); 
    contenedorFormRight.appendChild(contenedorPassword);

    //. BLOQUE 5....................................................
    let contenedorEmail = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelEmail = crearElemento('label', 'Email', {
        for: 'newUserEmail',
        class: 'form-label'
    });
    contenedorEmail.appendChild(labelEmail);

    let inputEmail = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUserEmail',
        class: 'form-control',
        placeholder: 'Email del usuario'
    });
    contenedorEmail.appendChild(inputEmail); 
    contenedorFormLeft.appendChild(contenedorEmail);

    //. BLOQUE 6....................................................
    let contenedorTelefono = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelTelefono = crearElemento('label', 'Teléfono', {
        for: 'newUserTelefono',
        class: 'form-label'
    });
    contenedorTelefono.appendChild(labelTelefono);

    let inputTelefono = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUserTelefono',
        class: 'form-control',
        placeholder: 'Teléfono del usuario'
    });
    contenedorTelefono.appendChild(inputTelefono); 
    contenedorFormRight.appendChild(contenedorTelefono);

    //. BLOQUE 7....................................................
    let contenedorObservaciones = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelObservaciones = crearElemento('label', 'Observaciones', {
        for: 'newUserObservacion',
        class: 'form-label'
    });
    contenedorObservaciones.appendChild(labelObservaciones);

    let inputObservaciones = crearElemento('textarea', undefined, {
        type: 'text',
        id: 'newUserObservacion',
        class: 'form-control',
        placeholder: 'Observaciones del nuevo usuario',
        rows: '5', 
    });
    contenedorObservaciones.appendChild(inputObservaciones); 

    contenedorFormLeft.appendChild(contenedorObservaciones);

    //. BLOQUE 4....................................................
    let contenedorEstado = crearElemento('div', undefined, {
        class: 'form-group w-100 contenedorFormUser'
    });

    let labelActivo = crearElemento('label', 'Estado', {
        for: 'userActive',
        class: 'form-label'
    });
    contenedorEstado.appendChild(labelActivo);

    let contenedorToggleAdmin = crearElemento('div', undefined, {
        class: 'form-switch container_toggle_admin mt-2 mb-2'
    })
    
    let toggleAdmin = crearElemento('input', undefined, {
        type: 'checkbox',
        id: 'userAdmin',
        class: 'form-check-input form-switch',
    });

    let toggleAdminLabel = crearElemento('p', 'Administrador', {
        class: 'labelToggleAdmin'
    });
    contenedorToggleAdmin.appendChild(toggleAdmin);
    contenedorToggleAdmin.appendChild(toggleAdminLabel);

    contenedorEstado.appendChild(contenedorToggleAdmin);

    let contenedorToggleActive = crearElemento('div', undefined, {
        class: 'form-switch container_toggle_active'
    })
    
    let toggleActive = crearElemento('input', undefined, {
        type: 'checkbox',
        id: 'userActive',
        class: 'form-check-input form-switch',
    });

    let toggleActiveLabel = crearElemento('p', 'Activo', {
        class: 'labelToggleActive'
    });
    contenedorToggleActive.appendChild(toggleActive);
    contenedorToggleActive.appendChild(toggleActiveLabel);

    contenedorEstado.appendChild(contenedorToggleActive);

    contenedorFormRight.appendChild(contenedorEstado);

    //. BOTONES......................................................
    let contenedorBotones = crearElemento('div', undefined, {
        class: 'form-group form_contenedor_botones'
    });

    let btnCancelar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Cancelar',
        class: 'btn btn_custom_3',
        onclick: 'cancelar()'
    });

    let btnVaciar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Limpiar datos',
        class: 'btn btn_custom_2',
        onclick: 'limpiarDatos()'
    });

    let btnCrearUsuario = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Crear usuario',
        class: 'btn btn_custom_1',
        onclick: 'crearUsuario()'
    });

    contenedorBotones.appendChild(btnCancelar);
    contenedorBotones.appendChild(btnVaciar);
    contenedorBotones.appendChild(btnCrearUsuario);

    contenedorFormTop.appendChild(contenedorFormLeft);
    contenedorFormTop.appendChild(contenedorFormRight);

    formUsuario.appendChild(contenedorFormTop); 
    formUsuario.appendChild(contenedorBotones); 

    contenedorForm.appendChild(formUsuario);
}

function newUsuario() {
    let nombreUser = document.getElementById('newUserName').value;
    let observaciones = document.getElementById('newUserObservacion').value;
    let nombre = document.getElementById('newName').value;
    let apellido = document.getElementById('newApellido').value;
    let password = document.getElementById('newPassword').value;
    let telefono = document.getElementById('newUserTelefono').value;
    let email = document.getElementById('newUserEmail').value;
    let activo = document.getElementById('userActive').value;
    let admin = document.getElementById('userAdmin').value;
    let parametros = {
        NewUsuario: JSON.stringify({
            admin: admin,
            nombre_usuario: nombreUser,
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
            activo: activo,
            telefono: telefono,
            observaciones: observaciones,
        })
    };
    console.log(parametros);

    $.ajax({
        type: "POST",
        url: "./php/consultaAdmin.php",
        data: parametros,
        error: function (a, b, errorMsg) {
            console.log(errorMsg);
        }
    }).done(function (a) {
        console.log(a);
        console.log("hecho");
    });
}

// Apartado PROVEEDORES___________________________________________________________________
function navProveedores() {
    pagListarProveedores();
}

function navListarProveedores() {
    pagListarProveedores();
}

function pagListarProveedores() {
    // Contenido para la parte superior
    let tituloPagina = "Proveedores";
    let contenidoSuperior = crearElemento("div", undefined, {
        class: "row contenidoSuperior",
        id: "categorias"
    });

    // Contenido para la parte inferior
    let contenidoInferior = document.createElement("div", undefined, {
        id: 'row contenidoInferior',
        class: 'contenidoInferior'
    });

    // Crear la plantilla genérica
    crearPlantillaGenerica1(tituloPagina, contenidoSuperior, contenidoInferior);
}

function navAñadirProveedor() {
    pagAñadirProveedor();

    let parametros = {
        proveedores: 'proveedores'
    };
    console.log(parametros);

    $.ajax({
        type: "POST",
        url: "./php/consultaAdmin.php",
        data: parametros,
        async: false,
        success: tablaProveedor,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}

// Formulario 6. Añadir proveedor.....................
function pagAñadirProveedor() {
    crearPlantillaFormularios('Nuevo proveedor', 'Datos del nuevo proveedor', 'Proveedores existentes');
    let contenedorForm = document.querySelector('#contenedorForm');

    let formProveedores = crearElemento('form', undefined, []);

    let contenedorFormTop = crearElemento('div', undefined, { // van el contenedor left y right
        class: 'form_contenedor_top'
    });

    let contenedorFormLeft = crearElemento('div', undefined, { // columna izquierda del formulario
        class: 'form_contenedor_left'
    });

    let contenedorFormRight = crearElemento('div', undefined, { // columna derecha del formulario
        class: 'form_contenedor_right'
    });

    //. BLOQUE 1....................................................
    let contenedorNombre = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelNombre = crearElemento('label', 'Nombre', {
        for: 'newProvName',
        class: 'form-label'
    });
    contenedorNombre.appendChild(labelNombre);

    let inputNombre = crearElemento('input', undefined, {
        type: 'text',
        id: 'newProvName',
        class: 'form-control',
        placeholder: 'Nombre del nuevo proveedor'
    });
    contenedorNombre.appendChild(inputNombre);

    contenedorFormLeft.appendChild(contenedorNombre);

    //. BLOQUE 2....................................................
    let contenedorTelefono = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelTelefono = crearElemento('label', 'Nombre', {
        for: 'newProvTelefono',
        class: 'form-label'
    });
    contenedorTelefono.appendChild(labelTelefono);

    let inputTelefono = crearElemento('input', undefined, {
        type: 'text',
        id: 'newProvTelefono',
        class: 'form-control',
        placeholder: 'Teléfono del proveedor'
    });
    contenedorTelefono.appendChild(inputTelefono);

    contenedorFormRight.appendChild(contenedorTelefono);

    //. BLOQUE 3....................................................
    let contenedorEmail = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelEmail = crearElemento('label', 'Email', {
        for: 'newProvEmail',
        class: 'form-label'
    });
    contenedorEmail.appendChild(labelEmail);

    let inputEmail = crearElemento('input', undefined, {
        type: 'text',
        id: 'newProvEmail',
        class: 'form-control',
        placeholder: 'Email del proveedor'
    });
    contenedorEmail.appendChild(inputEmail);

    contenedorFormRight.appendChild(contenedorEmail);

    //. BLOQUE 3....................................................
    let contenedorDireccion = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelDireccion = crearElemento('label', 'Dirección', {
        for: 'newProvDireccion',
        class: 'form-label'
    });
    contenedorDireccion.appendChild(labelDireccion);

    let inputDireccion = crearElemento('input', undefined, {
        type: 'text',
        id: 'newProvDireccion',
        class: 'form-control',
        placeholder: 'Dirección del proveedor'
    });
    contenedorDireccion.appendChild(inputDireccion);

    contenedorFormLeft.appendChild(contenedorDireccion);

    //. BLOQUE 5....................................................
    let contenedorObservaciones = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelObservaciones = crearElemento('label', 'Observaciones', {
        for: 'newProvObservacion',
        class: 'form-label'
    });
    contenedorObservaciones.appendChild(labelObservaciones);

    let inputObservaciones = crearElemento('textarea', undefined, {
        type: 'text',
        id: 'newProvObservacion',
        class: 'form-control',
        placeholder: 'Observaciones del nuevo usuario',
        rows: '5',
    });
    contenedorObservaciones.appendChild(inputObservaciones);

    contenedorFormLeft.appendChild(contenedorObservaciones);

    //. BOTONES......................................................
    let contenedorBotones = crearElemento('div', undefined, {
        class: 'form-group form_contenedor_botones'
    });

    let btnCancelar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Cancelar',
        class: 'btn btn_custom_3',
        onclick: 'cancelar()'
    });

    let btnVaciar = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Limpiar datos',
        class: 'btn btn_custom_2',
        onclick: 'limpiarDatos()'
    });

    let btnCrearUsuario = crearElemento("input", undefined, {
        type: 'submit',
        value: 'Crear usuario',
        class: 'btn btn_custom_1',
        onclick: 'crearProveedor()'
    });

    contenedorBotones.appendChild(btnCancelar);
    contenedorBotones.appendChild(btnVaciar);
    contenedorBotones.appendChild(btnCrearUsuario);

    contenedorFormTop.appendChild(contenedorFormLeft);
    contenedorFormTop.appendChild(contenedorFormRight);

    formProveedores.appendChild(contenedorFormTop);
    formProveedores.appendChild(contenedorBotones);

    contenedorForm.appendChild(formProveedores);
}

function tablaProveedores() {
}

function newProveedor() {
    let nombre = document.getElementById('newProvName').value;
    let observaciones = document.getElementById('newProvObservacion').value;
    let email = document.getElementById('newProvEmail').value;
    let telefono = document.getElementById('newProvTelefono').value;
    let direccion = document.getElementById('newProvDireccion').value;
    let parametros = {
        NewProveedor: JSON.stringify({
            descripcion: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion,
            observaciones: observaciones
        })
    };
    console.log(parametros);

    $.ajax({
        type: "POST",
        url: "./php/consultaAdmin.php",
        data: parametros,
        error: function (a, b, errorMsg) {
            console.log(errorMsg);
        }
    }).done(function (a) {
        console.log(a);
        console.log("hecho");
    });
}

// Apartado RESIDUOS_______________________________________________________________________
function navResiduos() {
    pagResiduos();
}

function pagResiduos() {
}

function enviarMensaje(e) {
    let usuarioActual = JSON.parse(localStorage.getItem("usuario"));

    let idUsuario = usuarioActual.clavePrimaria;
    let horaLimite = document.querySelector("#contenidoHoraLimiteNueva").value;
    let mensaje = document.querySelector("#mensajeNuevo").value;
    let fechaActual = obtenerFechaActual();

    if (horaLimite.trim() != "" || mensaje.trim() != "") {

        let parametros = {
            enviarNuevoMensaje: true,
            nuevaHoraLimite: horaLimite,
            nuevoMensaje: mensaje,
            id_usuario: idUsuario,
            fecha: fechaActual
        };

        //Insertar mensaje nuevo.
        $.ajax({
            //Ubicacion del archivo php que va a manejar los valores.
            url: "./php/consultaAdmin.php",
            //Metodo en que los va a recibir.
            type: "GET",
            dataType: "json",
            data: parametros,
            async: false,
            success: pagInicio,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
            }
        });

    }

}