/*
    Funciones comunes para el usuario y el administrador:
        - cerrarSesion()
        - crearElemento()
        - crearFormulario()

        Las siguientes funciones son dinámicas pero se llaman desde 
        cada script (user y admin) y se sobreescribe para adaptarlo 
        a cada perfil

        - consultarCategorias()
        - consultarProductos()
        - consultarPedidos()
        - consultarProveedores()

        - mostrarCategorias()
        - mostrarProductos()
        - mostrarPedidos()
        - mostrarProveedores()
*/

window.addEventListener("load", principal);

function principal() {
    let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    //Antes de cargar la pagina del usuario, se comprueba que no se haya accedido sin una sesion valida.
    if (usuarioActual != null) {
        if (usuarioActual.nombre === "") {
            window.location.replace("../../../sesion.html");
        }
    } else {
        //Redirige al usuario a la página de sesion no existen datos en el localStorage.
        window.location.replace("../../../sesion.html");
    }

    //Agregar el nombre del usuario a la barra superior.
    //Se usa el selector de clase, pero solo hay un elemento con esta clase.
    let nombreApellido = document.querySelector(".topbar_profile_name");
    let nombreCuenta = document.querySelector(".topbar_profile_account");

    nombreApellido.innerHTML = usuarioActual.nombre + " " + usuarioActual.apellido;
    nombreCuenta.innerHTML = usuarioActual.id_usuario;
}

function cerrarSesion() {
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../../sesion.html");
    }, 500);
}

/* Función dinámica para crear plantillas para las páginas de formularios de 2 columnas
    - tituloPagina (se especifica el nombre de la página. Ej.: Nuevo producto)
    - tituloLeft (título del contenedor izquierdo de la plantilla, el que contiene el form)
    - tituloRight (título del contenedor derecho de la plantilla)
*/
function crearPlantillaFormularios(tituloPagina, tituloLeft, tituloRight) {
    let contenedor = document.querySelector("#contenedor");
    contenedor.innerHTML = "";

    // Crear el título de la página
    let h1Inicio = crearElemento("h1", tituloPagina, {
        id: "tituloApartado",
        class: "py-3 mb-3 mt-4"
    });

    // Crear la parte superior de la página
    let parteSuperior = crearElemento('div', undefined, {
        class: 'row'
    });
    parteSuperior.appendChild(h1Inicio);
    contenedor.appendChild(parteSuperior);

    // Crear la parte inferior de la página con container_left y container_right
    let parteInferior = crearElemento('div', undefined, {
        class: 'row'
    });

    let container_left = crearElemento('div', undefined, {
        class: 'container_left card p-4 col-12 col-lg-8 mb-sm-4 mb-lg-0'
    });
    let titulo_container_left = crearElemento('h4', tituloLeft, {
        class: 'mb-5'
    });
    let contenedorForm = crearElemento('div', undefined, {
        id: 'contenedorForm'
    });

    container_left.appendChild(titulo_container_left);
    container_left.appendChild(contenedorForm);

    let container_right = crearElemento('div', undefined, {
        class: 'container_right card p-4 col-12 col-lg-4'
    });
    let titulo_container_right = crearElemento('div', tituloRight, {
        class: 'mb-5'
    });
    container_right.appendChild(titulo_container_right);

    parteInferior.appendChild(container_left);
    parteInferior.appendChild(container_right);

    contenedor.appendChild(parteSuperior);
    contenedor.appendChild(parteInferior);
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

/* Función dinámica para crear formularios
    - elementoPadre (se especifica el elemento HTML en el cual se va a insertar el formulario)
    - campos(recibe un array de objetos con todos los elementos a incluir en el formulario)
*/
function crearFormulario(campos, contenedor) {
    const formulario = document.createElement('form');

    // Recorrer las claves del objeto campos
    for (const nombreCampo in campos) {
        const campo = campos[nombreCampo];
        const elemento = crearElemento(campo.etiqueta, campo.contenido, campo.atributos);

        // Agregar el elemento al formulario
        formulario.appendChild(elemento);
    }
    contenedor.appendChild(formulario);
}

// Consulta general para recibir productos. La funcion devuelve un array de objetos literales con los datos de los productos.
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