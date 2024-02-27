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
    if (localStorage.getItem("usuario")) {
        let usuarioActual = JSON.parse(localStorage.getItem("usuario"));
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

    modoColor(); 
}

function modoColor() {
    const iconoPrincipal = document.getElementById("iconoPrincipal");

    // Event listener para cambiar entre los modos oscuro y claro
    document.getElementById("modoOscuro").addEventListener("click", function() {
        // Cambiar la clase del icono principal al modo oscuro
        iconoPrincipal.classList.replace("bi-brightness-high", "bi-moon");

        // Agregar la clase "darkMode" al cuerpo del documento
        document.body.classList.add("darkMode");
    });

    // Event listener para cambiar entre los modos oscuro y claro
    document.getElementById("modoClaro").addEventListener("click", function() {
        // Cambiar la clase del icono principal al modo claro
        iconoPrincipal.classList.replace("bi-moon", "bi-brightness-high");

        // Eliminar la clase "darkMode" del cuerpo del documento
        document.body.classList.remove("darkMode");
    });
}

function cerrarSesion() {
    localStorage.removeItem("usuario");

    setTimeout(function () {
        window.location.replace("../../../sesion.html");
    }, 500);
}

// Contenedor con borde punteado que aparece cuando una tabla está vacía o no tiene contenido
function mostrarMensajeVacio(titulo, texto, textoBoton) {
    let divRow = crearElemento("div", undefined, { class: "row" });
    let divCol = crearElemento("div", undefined, { class: "col-6 col-sm-3 col-md-3 col-lg-12" });
    let divLabelEmpty = crearElemento("div", undefined, { class: "label_empty card p-4 align-items-center mt-4" });
    let h4 = crearElemento("h4", titulo);
    let p = crearElemento("p", texto);
    let button = crearElemento("button", textoBoton, { type: "button", class: "btn btn_custom_1 mt-3" });

    // Construir la estructura
    divLabelEmpty.appendChild(h4);
    divLabelEmpty.appendChild(p);
    divLabelEmpty.appendChild(button);
    divCol.appendChild(divLabelEmpty);
    divRow.appendChild(divCol);

    return divRow;
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

/*
    Función dinámica para crear las plantilla de tipo 1 y 2 (un título de página y resto contenido)
        - parteSuperior: contiene un h1 y un div row (opcional)
        - parteInferior: contiene un h1 y un div row con el contenido que se le pase por parámetro
*/
function crearPlantillaGenerica1(tituloSuperior, contenidoSuperior, contenidoInferior) {
    // Crear el contenedor principal
    let contenedor = document.querySelector("#contenedor");
    contenedor.innerHTML = ""; // Limpiar el contenedor

    // Crear la parte superior de la página
    let parteSuperior = crearElemento("div", undefined, {
        id: 'parteSuperior',
        class: 'parteSuperior'
    });

    // Crear el título h1 y añadirlo a la parte superior
    let h1Superior = crearElemento("h1", tituloSuperior, {
        class: "py-3 mb-3 mt-4"
    });
    parteSuperior.appendChild(h1Superior);

    // Si hay contenido para la parte superior, lo añadimos
    if (contenidoSuperior) {
        let divRowSuperior = crearElemento('div', undefined, {
            class: 'row'
        });
        divRowSuperior.appendChild(contenidoSuperior);
        parteSuperior.appendChild(divRowSuperior);
    }

    // Crear la parte inferior de la página
    let parteInferior = crearElemento('div', undefined, {
        id: 'parteInferior',
        class: 'parteInferior mt-5'
    });

    parteInferior.innerHTML = "";

    // Si hay contenido para la parte inferior, lo añadimos
    if (contenidoInferior) {
        parteInferior.appendChild(contenidoInferior);
    }

    // Agregar partes al contenedor principal
    contenedor.appendChild(parteSuperior);
    contenedor.appendChild(parteInferior);
}

/*
    Función dinámica para crear la plantilla tipo 2 (dos secciones y dos títulos h1)
        - parteSuperior: contiene un h1 y un div row con el contenido que se le pase por parámetro
        - parteInferior: contiene un h1 y un div row con el contenido que se le pase por parámetro
*/
function crearPlantillaGenerica2(tituloSuperior, contenidoSuperior, tituloInferior, contenidoInferior) {
    let contenedor = document.querySelector("#contenedor");
    contenedor.innerHTML = "";

    // Crear la parte superior de la página
    let parteSuperior = crearElemento('div', undefined, {
        class: 'parteSuperior'
    });

    let h1Superior = crearElemento("h1", tituloSuperior, {
        class: "py-3 mb-3 mt-4"
    });

    let divRowSuperior = crearElemento('div', undefined, {
        class: 'row'
    });
    divRowSuperior.appendChild(contenidoSuperior);

    parteSuperior.appendChild(h1Superior);
    parteSuperior.appendChild(divRowSuperior);

    // Crear la parte inferior de la página
    let parteInferior = crearElemento('div', undefined, {
        class: 'parteInferior'
    });

    let h1Inferior = crearElemento("h1", tituloInferior, {
        class: "py-3 mb-3 mt-4"
    });

    let divRowInferior = crearElemento('div', undefined, {
        class: 'row'
    });
    divRowInferior.appendChild(contenidoInferior);

    parteInferior.appendChild(h1Inferior);
    parteInferior.appendChild(divRowInferior);

    // Agregar partes al contenedor principal
    contenedor.appendChild(parteSuperior);
    contenedor.appendChild(parteInferior);
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