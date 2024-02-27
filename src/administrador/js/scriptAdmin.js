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
}

// Formulario 1. Crear categorías...................
function pagAñadirCategoria() { 
    crearPlantillaFormularios('Nueva categoría', 'Datos de la nueva categoría', 'Categorías existentes');
    let contenedorForm = document.querySelector('#contenedorForm');

    let formCategorias = crearElemento('form', undefined, []);

    let contenedorFormTop = crearElemento('div', undefined, { // van el contenedor left y right
        class: 'form_contenedor_top'
    })

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
        id: 'dropdown contenedorImagen'
    });
    let etiquetaEnlace = crearElemento('a', undefined, {
        href: '#',
        role: 'button',
        id: 'dropdownImgCategoria',
        'data-bs-toggle': 'dropdown',
        'aria-expanded': 'false'
    });
        let imagenCategoriaContenedor = crearElemento('div', undefined, {
            id: 'imagenCategoriaContenedor',
            class: 'imagenCategoriaContenedor'
        })
        let iconSeleccionarImg = crearElemento('i', undefined, { // por defecto aparece un + 
            class: 'bi bi-x'
        }); 

        imagenCategoriaContenedor.appendChild(iconSeleccionarImg); 
        etiquetaEnlace.appendChild(imagenCategoriaContenedor); 

    let contenedorGaleriaImg = crearElemento('div', undefined, {
        class: 'new_img_categoria_container'
    });
    let estructuraGridGaleria = crearElemento('div', undefined, {
        class: 'img_categoria_grid'
    })
    let imgItemDropdown = crearElemento('div', undefined, {
        id: 'dropdown-item'
    });
    let imagenCategoria = crearElemento('img', undefined, {
        id: 'imagenSeleccionada',
        alt: 'Imagen de categoría'
    });

    // Mostrar imágenes en el select para seleccionar.......................................
    // Ruta de la carpeta de imágenes
    let rutaCarpeta = "../../../assets/img/categorias/";

    // Número de imágenes
    let numeroImagenes = 25; 

    // Crear las opciones del desplegable con las imágenes
    for (let i = 1; i <= numeroImagenes; i++) {
        // Generar el nombre de archivo de la imagen
        let nombreImagen = i.toString().padStart(2, "0") + ".png";
            
        // Eliminar los últimos cuatro caracteres (".png") del nombre de la imagen
        let nombreImagenSinExtension = nombreImagen.slice(0, -4);
        
        // Crear y agregar la opción al desplegable
        let option = crearElemento("option", {
            value: rutaCarpeta + nombreImagen,
            textContent: nombreImagenSinExtension
        });
        
        estructuraGridGaleria.appendChild(imgItemDropdown);
    }

    // Cambiar la imagen seleccionada cuando se elija una opción del desplegable
    selectImagen.addEventListener("change", function() {
        let rutaImagenSeleccionada = selectImagen.value;
        imagenCategoria.src = rutaImagenSeleccionada;
    });

    imgItemDropdown.appendChild(imagenCategoria); 
    estructuraGridGaleria.appendChild(imgItemDropdown);
    contenedorGaleriaImg.appendChild(estructuraGridGaleria);

    contenedorImagenSeleccionar.appendChild(etiquetaEnlace);
    contenedorImagenSeleccionar.appendChild(contenedorGaleriaImg);

    contenedorImagen.appendChild(contenedorImagenSeleccionar); 

    //. BLOQUE 2....................................................
    let contenedorNombre = crearElemento('div', undefined, {
        class: 'form-group w-100 form_cat_contenedor_nombre'
    });

    let labelNombre = crearElemento('label', 'Nombre', {
        for: 'newNombreCategoria',
        class: 'form-label'
    });
    contenedorNombre.appendChild(labelNombre);

    let inputNombre = crearElemento('input', undefined, {
        type: 'text',
        id: 'newNombreCategoria',
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

    let inputObservaciones = crearElemento('input', undefined, {
        type: 'text',
        id: 'newObservacionCategoria',
        class: 'form-control',
        placeholder: 'Observación de la nueva categoría'
    });
    contenedorObservaciones.appendChild(inputObservaciones); 

    contenedorFormLeft.appendChild(contenedorObservaciones);  // añadir a la columna izquierda del contenedor 

    //. BLOQUE 4....................................................
    let contenedorBuscarProductos = crearElemento('div', undefined, {
        class: 'form-group form_cat_contenedor_buscarProd'
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
    contenedorForm = document.querySelector('#contenedorForm');

    let camposNewProductos = {
        nombre: {
            etiqueta: 'label',
            contenido: 'Nombre',
            atributos: {
                for: 'newProductName',
                class: 'form-label'
            }
        },
        inputNombre: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newProductName',
                class: 'form-control',
                placeholder: "Nombre del producto"
            }
        },
        categoria: {
            etiqueta: 'label',
            contenido: 'Categoría',
            atributos: {
                for: 'newProductCategoria',
                class: 'form-label'
            }
        },
        inputCategoria: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newProductCategoria',
                class: 'form-control',
                placeholder: 'Categoría asociada al nuevo producto'
            }
        },
        unidadDeMedida: {
            etiqueta: 'label',
            contenido: 'Unidad de medida',
            atributos: {
                for: 'newProductUdMedida',
                class: 'form-label'
            }
        },
        inputUnidadDeMedida: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newProductUdMedida',
                class: 'form-control',
                placeholder: 'Unidad de medida del nuevo producto'
            }
        },
        residuos: {
            etiqueta: 'label',
            contenido: 'Residuos',
            atributos: {
                for: 'newProductResiduos',
                class: 'form-label'
            }
        },
        inputResiduos: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newProductResiduos',
                class: 'form-control',
                placeholder: 'Residuos del nuevo producto'
            }
        },
        observaciones: {
            etiqueta: 'label',
            contenido: 'Observaciones',
            atributos: {
                for: 'newProductObservaciones',
                class: 'form-label'
            }
        },
        inputObservaciones: {
            etiqueta: 'textarea',
            atributos: {
                type: 'text',
                id: 'newProductObservaciones',
                class: 'form-control',
                placeholder: 'Observaciones del nuevo producto'
            }
        },
        // Botones
        btnCancelar: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Cancelar',
                class: 'btn btn_custom_3',
                onclick: 'cancelar()'
            }
        },
        btnLimpiarDatos: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Limpiar datos',
                class: 'btn btn_custom_2',
                onclick: 'limpiarDatos()'
            }
        },
        btnCrearProducto: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Crear producto', 
                class: 'btn btn_custom_1',
                onclick: 'crearProducto()'
            }
        }
    };
    crearFormulario(camposNewProductos, contenedorForm);
}

// Formulario 3. Crear ud. de medida...................
function navUdMedida() { 
    pagUdMedida()
}

function pagUdMedida() {
    crearPlantillaFormularios('Nueva unidad de medida', 'Datos de la nueva ud. de medida', 'Ud. de medida existentes');
    contenedorForm = document.querySelector('#contenedorForm');

    let camposNewMedida = {
        nombre: {
            etiqueta: 'label',
            contenido: 'Nombre',
            atributos: { 
                for: 'newUdMedidaName',
                class: 'form-label'
            }
        },
        inputNombre: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', 
                id: 'newUdMedidaName',
                class: 'form-control',
                placeholder: 'Nombre de la nueva unidad de medida' 
            }
        },
        observaciones: {
            etiqueta: 'label',
            contenido: 'Observaciones',
            atributos: { 
                for: 'newUdMedidaObservaciones',
                class: 'form-label'
            }
        },
        inputObservaciones: {
            etiqueta: 'textarea',
            atributos: {
                type: 'text',
                id: 'newUdMedidaObservaciones',
                class: 'form-control',
                placeholder: 'Observaciones de la nueva unidad de medida'
            }
        },
        // Botones
        btnCancelar: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Cancelar',
                class: 'btn btn_custom_3',
                onclick: 'cancelar()'
            }
        },
        btnLimpiarDatos: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Limpiar datos',
                class: 'btn btn_custom_2',
                onclick: 'limpiarDatos()'
            }
        },
        btnCrearMedida: {
            etiqueta: 'input',
            atributos: { 
                type: 'submit', 
                value: 'Crear ud. de medida',
                class: 'btn btn_custom_1' 
            }
        }
    };
    crearFormulario(camposNewMedida, contenedorForm);
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
    contenedorForm = document.querySelector('#contenedorForm');

    let camposNewUsuario = {
        nombre: {
            etiqueta: 'label',
            contenido: 'Nombre',
            atributos: { 
                for: 'newUserName',
                class: 'form-label'
            }
        },
        inputNombre: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', 
                id: 'newUserName',
                class: 'form-control',
                placeholder: 'Nombre del nuevo usuario' 
            }
        },
        activo: {
            etiqueta: 'label',
            contenido: 'Activo',
            atributos: { 
                for: 'userActive',
                class: 'form-label'
            }
        },
        inputActivo: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', //! revisar tipo de input del toggle de usuario activo
                id: 'userActive',
                class: 'form-control' 
            }
        },
        telefono: {
            etiqueta: 'label',
            contenido: 'Teléfono',
            atributos: { 
                for: 'newUserTelefono',
                class: 'form-label'
            }
        },
        inputTelefono: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', 
                id: 'newUserTelefono',
                class: 'form-control',
                placeholder: 'Teléfono del nuevo usuario' 
            }
        },
        email: {
            etiqueta: 'label',
            contenido: 'Email',
            atributos: { 
                for: 'newUserEmail',
                class: 'form-label'
            }
        },
        inputEmail: {
            etiqueta: 'input',
            atributos: { 
                type: 'email', 
                id: 'newUserEmail',
                class: 'form-control',
                placeholder: 'Email del nuevo usuario' 
            }
        },
        observaciones: {
            etiqueta: 'label',
            contenido: 'Observaciones',
            atributos: { 
                for: 'newUserObservacion',
                class: 'form-label'
            }
        },
        inputObservaciones: {
            etiqueta: 'textarea',
            atributos: {
                type: 'text',
                id: 'newUserObservacion',
                class: 'form-control',
                placeholder: 'Observaciones del nuevo usuario'
            }
        },
        // Botones
        btnCancelar: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Cancelar',
                class: 'btn btn_custom_3',
                onclick: 'cancelar()'
            }
        },
        btnLimpiarDatos: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Limpiar datos',
                class: 'btn btn_custom_2',
                onclick: 'limpiarDatos()'
            }
        },
        btnCrearUsuario: {
            etiqueta: 'input',
            contenido: 'Crear ud. de medida',
            atributos: { 
                type: 'submit', 
                class: 'btn btn_custom_1',
                onclick: 'crearUsuario()' 
            }
        }
    };
    crearFormulario(camposNewUsuario, contenedorForm);
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
}

// Formulario 6. Añadir proveedor.....................
function pagAñadirProveedor() {
    crearPlantillaFormularios('Nuevo proveedor', 'Datos del nuevo proveedor', 'Proveedores existentes');
    // Contenedor general de la pagina
    let contenedorForm = document.querySelector("#contenedor");

    let formProveedores = crearElemento('form', undefined, []);

    contenedorForm.innerHTML = "";

    // Título de la página
    let h1Inicio = crearElemento("h1", "Nuevo proveedor", {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    contenedorForm.appendChild(h1Inicio);

    let camposNewProveedor = {
        nombre: {
            etiqueta: 'label',
            contenido: 'Nombre',
            atributos: { 
                for: 'newProvName',
                class: 'form-label'
            }
        },
        inputNombre: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', 
                id: 'newProvName',
                class: 'form-control',
                placeholder: 'Nombre del nuevo proveedor' 
            }
        },
        telefono: {
            etiqueta: 'label',
            contenido: 'Teléfono',
            atributos: { 
                for: 'newProvTelefono',
                class: 'form-label'
            }
        },
        inputTelefono: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', 
                id: 'newProvTelefono',
                class: 'form-control',
                placeholder: 'Teléfono del nuevo proveedor' 
            }
        },
        email: {
            etiqueta: 'label',
            contenido: 'Email',
            atributos: { 
                for: 'newProvEmail',
                class: 'form-label'
            }
        },
        inputEmail: {
            etiqueta: 'input',
            atributos: { 
                type: 'email', 
                id: 'newProvEmail',
                class: 'form-control',
                placeholder: 'Email del nuevo proveedor' 
            }
        },
        direccion: {
            etiqueta: 'label',
            contenido: 'Dirección',
            atributos: { 
                for: 'newProvDireccion',
                class: 'form-label'
            }
        },
        inputDireccion: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', 
                id: 'newProvDireccion',
                class: 'form-control',
                placeholder: 'Dirección del nuevo proveedor' 
            }
        },
        observaciones: {
            etiqueta: 'label',
            contenido: 'Observaciones',
            atributos: { 
                for: 'newProvObservacion',
                class: 'form-label'
            }
        },
        inputObservaciones: {
            etiqueta: 'textarea',
            atributos: {
                type: 'text',
                id: 'newProvObservacion',
                class: 'form-control',
                placeholder: 'Observaciones del nuevo proveedor'
            }
        },
        // Botones
        btnCancelar: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Cancelar',
                class: 'btn btn_custom_3',
                onclick: 'cancelar()'
            }
        },
        btnLimpiarDatos: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Limpiar datos',
                class: 'btn btn_custom_2',
                onclick: 'limpiarDatos()'
            }
        },
        btnCrearProveedor: {
            etiqueta: 'input',
            contenido: 'Crear proveedor',
            atributos: { 
                type: 'submit', 
                class: 'btn btn_custom_1',
                onclick: 'crearProveedor()' 
            }
        }
    };

    /*
    formProveedores.appendChild(camposNewProveedor); 
    contenedorForm.appendChild(formProveedores);
    */
}

// Apartado RESIDUOS_______________________________________________________________________
function navResiduos() {
    pagResiduos(); 
}

function pagResiduos() {
}