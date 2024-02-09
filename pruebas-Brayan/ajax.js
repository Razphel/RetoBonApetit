window.addEventListener("load", principal);

function principal() {
    //Pasas el nombre de la tabla
    buscarTabla("productos");
}

function manejarRespuesta(respuesta) {
    //Respuesta es un array de filas.
    //Cada fila es un objeto literal, para acceder a cada una escribes respuesta[0].nombre por ejemplo.
    console.log(respuesta);
}

function buscarTabla(nombreTabla) {
    let parametros = {
        tabla: nombreTabla
    };

    //Enviamos los valores a nuestro php usando ajax y jquery.
    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./inicio.php",
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
}

