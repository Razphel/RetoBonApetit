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
    // Apartado inicio
    document.querySelector("#navInicio").addEventListener("click", navInicio);
    // Apartado categorías
    document.querySelector("#navCategorias").addEventListener("click", navCategorias);
        document.querySelector("#navListarCategorias").addEventListener("click", navListarCategorias);
        document.querySelector("#navAñadirCategoria").addEventListener("click", navAñadirCategoria);
    // Apartado productos
    document.querySelector("#navProductos").addEventListener("click", navProductos);
        document.querySelector("#navListarProductos").addEventListener("click", navListarProductos);
        document.querySelector("#navAñadirProducto").addEventListener("click", navAñadirProducto);
        document.querySelector("#navUdMedida").addEventListener("click", navUdMedida);
    // Apartado solicitudes
    document.querySelector("#navSolicitudes").addEventListener("click", navSolicitudes);
    // Apartado pedidos
    document.querySelector("#navPedidos").addEventListener("click", navPedidos);
        document.querySelector("#navListarPedidos").addEventListener("click", navListarPedidos);
        document.querySelector("#navAñadirPedido").addEventListener("click", navAñadirPedido);
        document.querySelector("#navEstadosPedido").addEventListener("click", navEstadosPedido);
    // Apartado usuarios
    document.querySelector("#navUsuarios").addEventListener("click", navUsuarios);
        document.querySelector("#navListarUsuarios").addEventListener("click", navListarUsuarios);
        document.querySelector("#navAñadirUsuario").addEventListener("click", navAñadirUsuario);
    // Apartado proveedores
    document.querySelector("#navProveedores").addEventListener("click", navProveedores);
        document.querySelector("#navListarProveedores").addEventListener("click", navListarProveedores);
        document.querySelector("#navAñadirProveedor").addEventListener("click", navAñadirProveedor);
    // Apartado residuos
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

function navInicio() {

}

function pagInicio(respuesta) {

}

function pagUsuarios(respuesta) {
}

// LAURA FORMULARIOS........................................................................................
/* Plantilla para crear campos del formulario:
    let camposFormulario = [
        { etiqueta: 'label', contenido: 'Label 1', atributos: { for: 'input1', class: 'form-label' }},
        { etiqueta: 'input', atributos: { type: 'text', id: 'input1', class: '' }},
        { etiqueta: 'input', contenido: 'Crear', atributos: { type: 'submit', onclick: 'crear()', class: 'submit-class' }},
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
        { etiqueta: 'input', contenido: 'Cancelar', atributos: { //! revisar tipo de botones y sus eventos
            type: 'submit', 
            class: 'btn btn_custom_3', 
            onclick: '' 
        }},
        { etiqueta: 'input', contenido: 'Limpiar datos', atributos: { 
            type: 'submit', 
            class: 'btn btn_custom_2',
            onclick: '' }},
        { etiqueta: 'input', contenido: 'Crear categoría', atributos: { 
            type: 'submit', 
            class: 'btn btn_custom_1',
            onclick: '' }}
    ];

    // Obtener el contenedor donde se agregará el formulario
    let contenedorFormCategorias = aux; //! crear el contenedor donde insertar el formulario
    crearFormulario(camposNewCategoria, contenedorFormCategorias);
}

// Formulario 2. Crear ud. de medida
function navUdMedida() { // ud. de medida es un apartado del menú "productos"
    pagUdMedida()
}

function pagUdMedida() {
    // Contenedor general de la pagina
    let contenedor = document.querySelector("#contenedor");

    contenedor.innerHTML = "";

    // Título de la página
    let h1Inicio = crearElemento("h1", "Nueva unidad de medida", {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    contenedor.appendChild(h1Inicio);

    let camposNewMedida = {
        nombre: {
            etiqueta: 'label',
            contenido: 'Nombre',
            atributos: { 
                for: 'newUdMedida',
                class: 'form-label'
            }
        },
        inputNombre: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', 
                id: 'newUdMedida',
                class: 'form-control',
                placeholder: 'Nombre de la nueva unidad de medida' 
            }
        },
        observaciones: {
            etiqueta: 'label',
            contenido: 'Observaciones',
            atributos: { 
                for: 'newObservacionesMedida',
                class: 'form-label'
            }
        },
        inputObservaciones: {
            etiqueta: 'input',
            atributos: { 
                type: 'text', 
                id: 'newObservacionesMedida',
                class: 'form-control',
                placeholder: 'Observaciones de la nueva unidad de medida' 
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
    crearFormulario(camposNewMedida, contenedor);
}
// Formulario 3. Crear producto
function navProductos() {
    pagProductos();
}

function pagProductos() {
    // Contenedor general de la pagina
    let contenedor = document.querySelector("#contenedor");

    contenedor.innerHTML = "";

    // Título de la página
    let h1Inicio = crearElemento("h1", "Nuevo producto", {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    contenedor.appendChild(h1Inicio);

    let camposNewProductos = {
        nombre: {
            etiqueta: 'label',
            contenido: 'Nombre',
            atributos: {
                for: 'newNombreProducto',
                class: 'form-label'
            }
        },
        inputNombre: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newNombreProducto',
                class: 'form-control',
                placeholder: "Nombre del producto"
            }
        },
        categoria: {
            etiqueta: 'label',
            contenido: 'Categoría',
            atributos: {
                for: 'newCategoriaAsociada',
                class: 'form-label'
            }
        },
        inputCategoria: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newCategoriaAsociada',
                class: 'form-control',
                placeholder: 'Categoría asociada al nuevo producto'
            }
        },
        unidadDeMedida: {
            etiqueta: 'label',
            contenido: 'Unidad de medida',
            atributos: {
                for: 'newUnidadAsociada',
                class: 'form-label'
            }
        },
        inputUnidadDeMedida: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newUnidadAsociada',
                class: 'form-control',
                placeholder: 'Unidad de medida del nuevo producto'
            }
        },
        residuos: {
            etiqueta: 'label',
            contenido: 'Residuos',
            atributos: {
                for: 'newResiduosAsociados',
                class: 'form-label'
            }
        },
        inputResiduos: {
            etiqueta: 'input',
            atributos: {
                type: 'text',
                id: 'newResiduosAsociados',
                class: 'form-control',
                placeholder: 'Residuos del nuevo producto'
            }
        },
        observaciones: {
            etiqueta: 'label',
            contenido: 'Observaciones',
            atributos: {
                for: 'newObservacionProducto',
                class: 'form-label'
            }
        },
        inputObservaciones: {
            etiqueta: 'textarea',
            atributos: {
                type: 'text',
                id: 'newObservacionProducto',
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
                class: 'btn btn_custom_3'
            }
        },
        btnLimpiarDatos: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Limpiar datos',
                class: 'btn btn_custom_2'
            }
        },
        btnCrearProducto: {
            etiqueta: 'input',
            atributos: {
                type: 'submit',
                value: 'Crear producto', 
                class: 'btn btn_custom_1'
            }
        }
    };
   crearFormulario(camposNewProductos, contenedor);
}
// Formulario 4. Hacer pedido
function navPedidos() {

}

function pagPedidos(respuesta) {

}
// Formulario 5. Crear usuario
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

function pagUsuarios(respuesta) {
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
        { etiqueta: 'input', contenido: 'Crear ud. de medida', atributos: { 
            type: 'submit', 
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
}

function pagProveedores(respuesta) {
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
        { etiqueta: 'input', contenido: 'Crear ud. de medida', atributos: { 
            type: 'submit', 
            onclick: '', 
            class: 'btn btn_custom_1' 
        }},
    ]
    // Obtener el contenedor donde se agregará el formulario
    let contenedorFormProveedor = aux; //! crear el contenedor donde insertar el formulario
    crearFormulario(camposNewProveedor, contenedorFormProveedor);
}

function navResiduos() {
}

function pagResiduos(respuesta) {
}

// USER
// Formulario 1. Cesta/Carrito
// Formulario 2. Enviar solicitud

// HERRAMIENTAS_____________________________________________________________________________________
/* Función dinámica para crear formularios
    - elementoPadre (se especifica el elemento HTML en el cual se va a insertar el formulario)
    - campos(recibe un array de objetos con todos los elementos a incluir en el formulario)
*/
