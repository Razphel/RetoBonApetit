window.addEventListener("load", principal);

function principal() {
    //Antes de cargar la pagina principal, compruebo que no exista ya una sesion iniciada.
    if (localStorage.getItem("usuario")) {
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
        //Si es admin, redirecciona a la pagina de administradores.
        if (usuarioActual.tipo == 1) {
            window.location.replace("./src/administrador/inicioAdmin.html");
        }
        //Si no, te lleva a los usuarios.
        if (usuarioActual.tipo == 0) {
            window.location.replace("./src/usuario/inicioUsuario.html");
        }
    }

    //Uso jquery para seleccionar los elementos.
    //Los manejadores de eventos en jquery se usan como funciones.
    $("#entrar").click(iniciarSesion);
    $("#login").submit(function (e) { e.preventDefault(); });

    $(document).ready(function () {
        $('#toggleContraseña').click(function () {
            const contraseñaInput = $('#contraseña');
            const tipo = contraseñaInput.attr('type') === 'password' ? 'text' : 'password';
            contraseñaInput.attr('type', tipo);
            $(this).find('i').toggleClass('bi bi-eye');
        });
    });

    //Eventos blur, que se disparan cuando el usuario pierde la seleccion.
    //La funcion comprueba que el campo este vacio, si lo esta, marca el input en rojo.
    $("#nombreUsuario").blur(comprobarEntrada);
    $("#contraseña").blur(comprobarEntrada);

}

function iniciarSesion() {
    let user = document.querySelector("#nombreUsuario").value;
    let pass = document.querySelector("#contraseña").value;

    //Vuelvo a comprobar que los datos no esten vacios.
    if (comprobarVacio(user) && comprobarVacio(pass)) {
        //Obtenemos los datos del formulario, el nombre de cada variable debe ser igual que el $_REQUEST de php.
        let parametros = {
            nombreUsuario: user,
            contraseña: pass
        };

        //Enviamos los valores a nuestro php usando ajax y jquery.
        $.ajax({
            //Ubicacion del archivo php que va a manejar los valores.
            url: "./assets/php/controlUsuario.php",
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
        //Agrego la clase para resaltar en rojo el mensaje de error.
        salida.classList.add('alert', 'alert-danger');
        salida.innerHTML = "Error. Debes rellenar todos los campos.";
    }
}

function manejarRespuesta(respuesta) {
    let salida = document.querySelector("#salida");
    if (!respuesta) {
        //El usuario no existe.
        //Agrego la clase para resaltar en rojo el mensaje de error.
        salida.classList.add('alert', 'alert-danger');
        salida.innerHTML = "Error. Comprueba los datos.";
    } else {
        //Compruebo que el usuario no este dado de baja.
        if (respuesta.activo == 0) {
            //Agrego la clase para resaltar en rojo el mensaje de error.
            salida.classList.add('alert', 'alert-danger');
            salida.innerHTML = "Error. Usuario dado de baja.";
        } else {
            //Si todo va bien guardo el usuario en la sesion.
            localStorage.setItem("usuario", JSON.stringify({ nombre: respuesta.nombre, tipo: respuesta.admin, activo: respuesta.activo, clavePrimaria: respuesta.id_usuarios }));

            //Ahora hay que comprobar si es administrador.
            if (respuesta.admin == 1) {
                //Si es administrador o usuario, impirmo si mensaje correspondiente y hago una redireccion a los dos segundos.
                window.location.replace("./src/administrador/inicioAdmin.html");
            } else {
                window.location.replace("./src/usuario/inicioUsuario.html");
            }
        }
    }
}

function comprobarEntrada(e) {
    let entrada = this.value;
    if (comprobarVacio(entrada)) {
        this.classList.remove("is-invalid");
    } else {
        this.classList.add("is-invalid");
    }
}

function comprobarVacio(texto) {
    let respuesta = false;
    texto = texto.trim();

    // Comprueba si alguno de los campos estan vacios.
    if (texto.length > 0) {
        respuesta = true;
    }
    return respuesta;
}