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
    document.querySelector("#navCategorias").addEventListener("click", navCategorias);
        document.querySelector("#navListarCategorias").addEventListener("click", navListarCategorias);
        document.querySelector("#navAñadirCategoria").addEventListener("click", navAñadirCategoria);
        document.querySelector("#shortcut_categoria").addEventListener("click", navAñadirCategoria);
    // Apartado productos
    document.querySelector("#navProductos").addEventListener("click", navProductos);
        document.querySelector("#navListarProductos").addEventListener("click", navListarProductos);
        document.querySelector("#navAñadirProducto").addEventListener("click", navAñadirProducto);
        document.querySelector("#shortcut_producto").addEventListener("click", navAñadirProducto);
        document.querySelector("#navUdMedida").addEventListener("click", navUdMedida);
        document.querySelector("#shortcut_medida").addEventListener("click", navUdMedida);
    // Apartado solicitudes
    document.querySelector("#navSolicitudes").addEventListener("click", navSolicitudes);
    // Apartado pedidos
    document.querySelector("#navPedidos").addEventListener("click", navPedidos);
        document.querySelector("#navListarPedidos").addEventListener("click", navListarPedidos);
        document.querySelector("#navNuevoPedido").addEventListener("click", navNuevoPedido);
        document.querySelector("#shortcut_pedido").addEventListener("click", navNuevoPedido);
    // Apartado usuarios
    document.querySelector("#navUsuarios").addEventListener("click", navUsuarios);
        document.querySelector("#navListarUsuarios").addEventListener("click", navListarUsuarios);
        document.querySelector("#navAñadirUsuario").addEventListener("click", navAñadirUsuario);
        document.querySelector("#shortcut_usuario").addEventListener("click", navAñadirUsuario);
    // Apartado proveedores
    document.querySelector("#navProveedores").addEventListener("click", navProveedores);
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
        item.addEventListener('click', function() {
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

    pagInicio(); 
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

// MANEJADORES COMUNES DE FORMULARIOS PARA BOTONES.........................................
function limpiarDatos() {
    let formulario = document.getElementById("formulario");
    formulario.reset();
}

function cancelar() {
    window.location.href('./');
}

// Apartado INICIO____________________________________________________________________
function navInicio() {
    pagInicio(); 
}

function pagInicio() {
}

// Apartado CATEGORÍAS________________________________________________________________
function navCategorias() { 
    navListarCategorias(); 
}

function navListarCategorias() {
    pagListarCategorias();
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
        success: tablaCategorias,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
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
        imgCategoriaDropdown.addEventListener("click", function() {
            imagenCategoria.src = rutaCarpeta + nombreImagen;
        });
        imgItemDropdown.appendChild(imgCategoriaDropdown);
        estructuraGridGaleria.appendChild(imgItemDropdown);
    }
    console.log(estructuraGridGaleria); 

    // Cambiar la imagen seleccionada cuando se elija una opción del desplegable
    imagenCategoriaContenedor.addEventListener("change", function() {
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

function tablaCategorias() {
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
        error: function(a,b,errorMsg) {
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
    pagListarProductos(); 
}

function pagListarProductos() { // mostrar tabla con todos los productos y sus datos
    // Contenido para la parte superior
    let tituloPagina = "Productos";
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
        for: 'newUserName',
        class: 'form-label'
    });
    contenedorNombre.appendChild(labelNombre);

    let inputNombre = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUserName',
        class: 'form-control',
        placeholder: 'Nombre de la nueva ud. de medida'
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
    contenedorNombre.appendChild(labelApellido);

    let inputApellido = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUserApellido',
        class: 'form-control',
        placeholder: 'Apellido del nuevo usuario'
    });
    contenedorApellido.appendChild(inputApellido); 

    contenedorFormRight.appendChild(contenedorApellido);

    //. BLOQUE 3....................................................
    let contenedorUsername = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelUsername = crearElemento('label', 'Apellido', {
        for: 'newUsername',
        class: 'form-label'
    });
    contenedorNombre.appendChild(labelUsername);

    let inputUsername = crearElemento('input', undefined, {
        type: 'text',
        id: 'newUsername',
        class: 'form-control',
        placeholder: 'Apellido del nuevo usuario'
    });
    contenedorUsername.appendChild(inputUsername); 

    contenedorFormRight.appendChild(contenedorUsername);

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
        error: function(a,b,errorMsg) {
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
function navUsuarios() {
    navListarUsuarios();

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

function navListarUsuarios() {
    pagListarUsuarios(); 

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
        placeholder: 'Nombre del nuevo usuario'
    });
    contenedorNombre.appendChild(inputNombre); 

    contenedorFormLeft.appendChild(contenedorNombre);

    //. BLOQUE 2....................................................
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

    contenedorFormLeft.appendChild(contenedorTelefono);

    //. BLOQUE 3....................................................
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
    let contenedorActivo = crearElemento('div', undefined, {
        class: 'form-group w-100'
    });

    let labelActivo = crearElemento('label', 'Activo', {
        for: 'userActive',
        class: 'form-label'
    });
    contenedorActivo.appendChild(labelActivo);

    let toggleContainer = crearElemento('div', undefined, {
        class: 'form-switch'
    });
    
    let toggleActivo = crearElemento('input', undefined, {
        type: 'checkbox',
        id: 'userActive',
        class: 'form-check-input form-switch',
    });
    toggleContainer.appendChild(toggleActivo);

    contenedorActivo.appendChild(toggleContainer); 

    contenedorFormRight.appendChild(contenedorActivo);

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

    contenedorFormRight.appendChild(contenedorEmail);

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
        error: function(a,b,errorMsg) {
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
        error: function(a,b,errorMsg) {
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