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
    contenedorForm = document.querySelector('#contenedorForm');

    let camposNewCategoria = {
        nombre: {
            etiqueta: 'label',
            contenido: 'Nombre',
            atributos: {
                for: 'newNombreCategoria',
                class: 'form-label'
            }
        },
        inputNombre: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newNombreCategoria',
                class: 'form-control',
                placeholder: 'Nombre de la nueva categoría'
            }
        },
        observaciones: {
            etiqueta: 'label',
            contenido: 'Observaciones',
            atributos: {
                for: 'newObservacionCategoria',
                class: 'form-label'
            }
        },
        inputObservaciones: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newObservacionCategoria',
                class: 'form-control',
                placeholder: 'Observación de la nueva categoría'
            }
        },
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
        btnCrearCategoria: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Crear categoría',
                class: 'btn btn_custom_1',
                onclick: 'newCategoria()'
            }
        }
    };
    crearFormulario(camposNewCategoria, contenedorForm);

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

function newCategoria()
{
    let nombre = document.getElementById('newNombreCategoria').value;
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

function tablaCategorias()
{

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
                id: 'btnCancelar',
                value: 'Cancelar',
                class: 'btn btn_custom_3',
                onclick: 'cancelar()'
            }
        },
        btnLimpiarDatos: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                id: 'btnLimpiarDatos',
                value: 'Limpiar datos',
                class: 'btn btn_custom_2',
                onclick: 'limpiarDatos()'
            }
        },
        btnCrearMedida: {
            etiqueta: 'input',
            atributos: { 
                type: 'submit', 
                id: 'btnCrearMedida',
                value: 'Crear ud. de medida',
                class: 'btn btn_custom_1',
                onclick: 'newUdMedida()' 
                
            }
        }
    };
    crearFormulario(camposNewMedida, contenedorForm);
    
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

function newUdMedida()
{   
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

//Función que imprime la tabla de Unidades de Medida
function tablaUnidadesMedida()
{
    
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
    // Contenedor general de la pagina
    let contenedor = document.querySelector("#contenedor");

    contenedor.innerHTML = "";

    // Título de la página
    let h1Inicio = crearElemento("h1", "Nuevo proveedor", {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    contenedor.appendChild(h1Inicio);

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
            atributos: { 
                value: 'Crear proveedor',
                type: 'submit', 
                class: 'btn btn_custom_1',
                onclick: 'newProveedor()' 
            }
        }
    };
    crearFormulario(camposNewProveedor, contenedor);
    
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

function tablaProveedores()
{

}

function newProveedor()
{
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