window.addEventListener("load", principal);

function principal() {
    //Antes de cargar la pagina del usuario, se comprueba que no se haya accedido sin una sesion valida.
    if (localStorage.getItem("usuario")) {
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioActual.nombre === "") {
            window.location.replace("../../html/sesion.html");
        }
    }
    document.querySelector("#botonDeMierda").addEventListener("click", botonInsertar);

    let contenedor = document.querySelector("#contenedor");
    let formulario = crearElemento("form",undefined,{id:"formNewCategoria"});
    let labelDescripcion = crearElemento("label","Descripcion",{id:"descripcionCategoria"});
    let inputDescripcion = crearElemento("input",undefined,{id:"descripcionCategoria"});
    let labelImagen = crearElemento("label","Imagen",{id:"imagenesCategoria"});
    let inputImagen = crearElemento("input",undefined,{id:"imagenesCategoria"});
    let labelObservaciones = crearElemento("label","Observaciones",{id:"observacionesCategoria"});
    let inputObservaciones = crearElemento("input",undefined,{id:"observacionesCategoria"});
    let botonDeMierda = crearElemento("input",undefined,{id:"botonDeMierda",type:"button"});

    contenedor.appendChild(formulario);
    formulario.appendChild(labelDescripcion);
    formulario.appendChild(inputDescripcion);
    formulario.appendChild(labelImagen);
    formulario.appendChild(inputImagen);
    formulario.appendChild(labelObservaciones);
    formulario.appendChild(inputObservaciones);
    formulario.appendChild(botonDeMierda);

}
function botonInsertar()
{
    let descripcionCategoria = document.querySelector("#descripcionCategoria");
    let imagenesCategoria = document.querySelector("#descripcionCategoria");
    let observacionesCategoria = document.querySelector("#descripcionCategoria");
}

function newCategoria()
{   

    $.ajax({
        //Ubicacion del archivo php que va a manejar los valores.
        url: "./php/consultaUsuario.php",
        //Metodo en que los va a recibir.
        type: "GET",
        data: parametros,
        dataType: "json",
        success: mostrarProveedores,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
        }
    });
}