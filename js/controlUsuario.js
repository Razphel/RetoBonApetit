window.addEventListener("load", principal);
 
function principal() {
    //Antes de cargar la pagina principal, compruebo que no exista ya una sesion iniciada.
    if (localStorage.getItem("usuario")) {
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
        //Si es admin, redirecciona a la pagina de administradores.
        if (usuarioActual.tipo == 1) {
            window.location.replace("../administrador/inicioAdmin.html");
        }
        //Si no, te lleva a los usuarios.
        if (usuarioActual.tipo == 0) {
            window.location.replace("../usuario/inicioUsuario.html");
        }
    }
 
    //Uso jquery para seleccionar los elementos.
    //Los manejadores de eventos en jquery se usan como funciones.
    $("#entrar").click(iniciarSesion);
    $("#login").submit(function (e) { e.preventDefault(); })
 
}
 
function iniciarSesion() {
    //Compruebo que los datos no esten vacios.
    let user = document.querySelector("#nombreUsuario").value;
    let pass = document.querySelector("#contraseña").value;
 
    if (comprobarVacio(user, pass)) {
        //Obtenemos los datos del formulario, el nombre de cada variable debe ser igual que el $_REQUEST de php.
        let parametros = {
            nombreUsuario: user,
            contraseña: pass
        };
 
        //Enviamos los valores a nuestro php usando ajax y jquery.
        $.ajax({
            //Ubicacion del archivo php que va a manejar los valores.
            url: "../php/controlUsuario.php",
            //Metodo en que los va a recibir.
            type: "GET",
            //Las variables que le enviamos.
            data: parametros,
            dataType: "json",
            //La funcion que se ejecuta segun el resultado.
            success: manejarRespuesta,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
            }
        });
 
    } else {
        let salida = document.querySelector("#salida");
        salida.innerHTML = "ERROR: Debes rellenar ambos campos.";
    }
 
}
 
function manejarRespuesta(respuesta) {
    let salida = document.querySelector("#salida");
    if (!respuesta) {
        //El usuario no existe.
        salida.innerHTML = "ERROR: Comprueba los datos.";
 
    } else {
        //Guardo el usuario en la sesion.
        localStorage.setItem("usuario", JSON.stringify({ nombre: respuesta.nombre, tipo: respuesta.admin, activo: respuesta.activo }));
        //El usuario existe. Ahora hay que comprobar si es administrador.
        if (respuesta.admin == 1) {
            //Si es administrador o usuario, impirmo si mensaje correspondiente y hago una redireccion a los dos segundos.
            salida.innerHTML = "Soy admin";
            setTimeout(function () {
                window.location.replace("../administrador/inicioAdmin.html");
            }, 2000);
        } else {
            salida.innerHTML = "Soy usuario";
            setTimeout(function () {
                window.location.replace("../usuario/inicioUsuario.html");
            }, 2000);
        }
    }
}
 
function comprobarVacio(usuario, contraseña) {
    let respuesta = false;
    usuario = usuario.trim();
    contraseña = usuario.trim();
 
 
    // Comprueba si alguno de los campos estan vacios.
    if (usuario.length > 0 && contraseña.length > 0) {
        respuesta = true;
    }
    return respuesta;
}