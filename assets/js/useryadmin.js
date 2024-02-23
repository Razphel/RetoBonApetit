/*
    Funciones comunes para el usuario y el administrador:
        - cerrarSesion()
        - crearElemento()
        - crearFormulario()

        Las siguientes funciones son dinámicas pero se llaman desde 
        cada script (user y admin) y se sobreescribe para adaptarlo 
        a cada perfil

        //! función dinámica para consultar cualquier dato de la BBDD
        - consultarCategorias()
        - consultarProductos()
        - consultarPedidos()
        - consultarProveedores()

        //! función dinámica para mostrar cualquier dato de la BBDD
        - mostrarCategorias()
        - mostrarProductos()
        - mostrarPedidos()
        - mostrarProveedores()
*/

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
}

function cerrarSesion() {
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../../sesion.html");
    }, 500);
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