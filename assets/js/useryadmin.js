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

    // Boton para cerrar la sesion y redireccionar a la pagina de inicio.
    document.querySelector("#cerrarSesion").addEventListener("click", cerrarSesion);
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
    let formulario = crearElemento('form');

    campos.forEach(campo => {
        let etiqueta = campo.etiqueta || 'input';
        let atributos = campo.atributos || {};
        let contenido = campo.contenido || '';

        let input = crearElemento(etiqueta);

        for (let clave in atributos) {
            input.setAttribute(clave, atributos[clave]);
        }

        if (contenido !== '') {
            input.value = contenido;
        }
        formulario.appendChild(input);
    });

    if (contenedor instanceof HTMLElement) {
        contenedor.appendChild(formulario);
    } else {
        console.error('El contenedor especificado no es un elemento HTML válido.');
    }
}