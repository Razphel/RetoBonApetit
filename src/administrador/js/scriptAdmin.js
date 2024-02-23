/*
    Páginas del usuario:
        - Inicio 
        - Categorías (navCategorias)
        - Productos (navProductos)
        - Solicitudes (navSolicitudes)
        - Pedidos (navPedidos)
        - Proveedores (navProveedores)
        - Residuos (navResiduos)

    Funciones comunes para el admin y el usuario (deberían ir en el js de assets):
        - crearElemento()
        - crearFormulario()
        - consultarProductos()
        - guardarProductos()
        - pagProductos()
*/

window.addEventListener("load", principal);

function principal() {
    document.querySelector("#navCategorias").addEventListener("click", navCategorias);
    document.querySelector("#navProductos").addEventListener("click", navProductos);
    document.querySelector("#navSolicitudes").addEventListener("click", navSolicitudes);
    document.querySelector("#navPedidos").addEventListener("click", navPedidos);
    document.querySelector("#navProveedores").addEventListener("click", navProveedores);
    document.querySelector("#navResiduos").addEventListener("click", navResiduos);
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

// LAURA FORMULARIOS........................................................................................
/* Plantilla para crear campos del formulario:
    let camposFormulario = [
        { etiqueta: 'label', contenido: 'Label 1', atributos: { for: 'input1', class: 'form-label' }},
        { etiqueta: 'input', atributos: { type: 'text', id: 'input1', class: '' }},
        { etiqueta: 'button', contenido: 'Crear', atributos: { type: 'button', onclick: 'crear()', class: 'button-class' }},
    ]
*/

// ADMIN
// Formulario 1. Crear categorías
function navCategorias() { 
    let camposNewCategoria = [
        { etiqueta: 'label', contenido: 'Nombre', atributos: {
            for: 'newNombreCategoria',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newNombreCategoria',
            class: '' 
        }},
        { etiqueta: 'label', contenido: 'Observaciones', atributos: {
            for: 'newObservacionCategoria',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newObservacionCategoria',
            class: '' 
        }},
        // Botones................................................
        { etiqueta: 'button', contenido: 'Cancelar', atributos: { //! revisar tipo de botones y sus eventos
            type: 'button', 
            class: 'btn btn_custom_3', 
            onclick: '' 
        }},
        { etiqueta: 'button', contenido: 'Limpiar datos', atributos: { 
            type: 'button', 
            class: 'btn btn_custom_2',
            onclick: '' }},
        { etiqueta: 'button', contenido: 'Crear categoría', atributos: { 
            type: 'button', 
            class: 'btn btn_custom_1',
            onclick: '' }}
    ];

    // Obtener el contenedor donde se agregará el formulario
    let contenedorFormCategorias = aux; //! crear el contenedor donde insertar el formulario
    crearFormulario(camposNewCategoria, contenedorFormCategorias);
}

// Formulario 2. Crear ud. de medida
function navUdMedida() { // ud. de medida es un apartado del menú "productos"
    let camposNewMedida = [
        { etiqueta: 'label', contenido: 'Nombre', atributos: { 
            for: 'newUdMedida',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newUdMedida',
            class: '' }},
        { etiqueta: 'label', contenido: 'Observaciones', atributos: { 
            for: 'newObservacionesMedida',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newObservacionesMedida',
            class: '' }},
        { etiqueta: 'button', contenido: 'Crear ud. de medida', atributos: { 
            type: 'button', 
            onclick: '', 
            class: 'btn btn_custom_1' 
        }},
    ]
    // Obtener el contenedor donde se agregará el formulario
    let contenedorFormMedidas = aux; //! crear el contenedor donde insertar el formulario
    crearFormulario(camposNewMedida, contenedorFormMedidas);
}
// Formulario 3. Crear producto
function navProductos() {
    let camposNewProductos = [
        { etiqueta: 'label', contenido: 'Nombre', atributos: {
            for: 'newNombreProducto',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newNombreProducto',
            class: '' 
        }},
        { etiqueta: 'label', contenido: 'Categoría', atributos: {
            for: 'newCategoriaAsociada',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newCategoriaAsociada',
            class: '' 
        }},
        { etiqueta: 'label', contenido: 'Unidad de medida', atributos: {
            for: 'newUnidadAsociada',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newUnidadAsociada',
            class: '' 
        }},
        { etiqueta: 'label', contenido: 'Residuos', atributos: {
            for: 'newResiduosAsociados',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newResiduosAsociados',
            class: '' 
        }},
        { etiqueta: 'label', contenido: 'Observaciones', atributos: {
            for: 'newObservacionProducto',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newObservacionProducto',
            class: '' 
        }},
        // Botones................................................
        { etiqueta: 'button', contenido: 'Cancelar', atributos: { //! revisar tipo de botones y sus eventos
            type: 'button', 
            class: 'btn btn_custom_3', 
            onclick: '' 
        }},
        { etiqueta: 'button', contenido: 'Limpiar datos', atributos: { 
            type: 'button', 
            class: 'btn btn_custom_2',
            onclick: '' }},
        { etiqueta: 'button', contenido: 'Crear categoría', atributos: { 
            type: 'button', 
            class: 'btn btn_custom_1',
            onclick: '' }}
    ]
    // Obtener el contenedor donde se agregará el formulario
    let contenedorFormProductos = aux; //! crear el contenedor donde insertar el formulario
    crearFormulario(camposNewProductos, contenedorFormProductos);
}
// Formulario 4. Hacer pedido
function navPedidos() {

}
// Formulario 5. Crear usuario
function navUsuarios() {
    let camposNewUsuario = [
        { etiqueta: 'label', contenido: 'Nombre', atributos: { 
            for: 'newUsername',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newUsername',
            class: '' }},
        { etiqueta: 'label', contenido: 'Activo', atributos: { 
            for: 'userActive',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', //! revisar tipo de input del toggle de usuario activo
            id: 'userActive',
            class: '' }},
        { etiqueta: 'label', contenido: 'Teléfono', atributos: { 
            for: 'newUserTelefono',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newUserTelefono',
            class: '' }},
        { etiqueta: 'label', contenido: 'Email', atributos: { 
            for: 'newUserEmail',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'email', 
            id: 'newUserEmail',
            class: '' }},
        { etiqueta: 'label', contenido: 'Observaciones', atributos: { 
            for: 'newObservacionUser',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newObservacionUser',
            class: '' }},
        { etiqueta: 'button', contenido: 'Crear ud. de medida', atributos: { 
            type: 'button', 
            onclick: '', 
            class: 'btn btn_custom_1' 
        }},
    ]
    // Obtener el contenedor donde se agregará el formulario
    let contenedorFormUsuario = aux; //! crear el contenedor donde insertar el formulario
    crearFormulario(camposNewUsuario, contenedorFormUsuario);
}
// Formulario 6. Crear proveedor
function navProveedores() {
    let camposNewProveedor = [
        { etiqueta: 'label', contenido: 'Nombre', atributos: { 
            for: 'newProvName',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newProvName',
            class: '' }},
        { etiqueta: 'label', contenido: 'Teléfono', atributos: { 
            for: 'newProvTelefono',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'int', 
            id: 'newProvTelefono',
            class: '' }},
        { etiqueta: 'label', contenido: 'Email', atributos: { 
            for: 'newProvEmail',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'email', 
            id: 'newProvEmail',
            class: '' }},
        { etiqueta: 'label', contenido: 'Dirección', atributos: { 
            for: 'newProvDirec',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newProvDirec',
            class: '' }},
        { etiqueta: 'label', contenido: 'Observaciones', atributos: { 
            for: 'newObservacionesProv',
            class: 'form-label'
        }},
        { etiqueta: 'input', atributos: { 
            type: 'text', 
            id: 'newObservacionesProv',
            class: '' }},
        { etiqueta: 'button', contenido: 'Crear ud. de medida', atributos: { 
            type: 'button', 
            onclick: '', 
            class: 'btn btn_custom_1' 
        }},
    ]
    // Obtener el contenedor donde se agregará el formulario
    let contenedorFormProveedor = aux; //! crear el contenedor donde insertar el formulario
    crearFormulario(camposNewProveedor, contenedorFormProveedor);
}

// USER
// Formulario 1. Cesta/Carrito
// Formulario 2. Enviar solicitud

// HERRAMIENTAS_____________________________________________________________________________________
/* Función dinámica para crear formularios
    - elementoPadre (se especifica el elemento HTML en el cual se va a insertar el formulario)
    - campos(recibe un array de objetos con todos los elementos a incluir en el formulario)
*/
