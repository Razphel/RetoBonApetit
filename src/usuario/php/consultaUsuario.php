<?php
include_once '../../../assets/php/BD.php';
// Para que el navegador no haga cache (fecha de expiración menor a la actual)
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

// Indicamos  al navegador que va a recibir contenido JSON
header("Content-Type: application/json");

//Devuelve la consulta de los pedidos del usuario, recibiendo el id del usuario.
if (isset($_REQUEST['claveUsuario'])) {
    $id_usuario = $_REQUEST['claveUsuario'];
    $historial = BD::imprimirPedidos($id_usuario);
    echo json_encode($historial);
}

//Devuelve la consulta con los proveedores
if (isset($_REQUEST['claveProveedores'])) {
    $proveedores = BD::imprimirConsultas('proveedores');
    echo json_encode($proveedores);
}

//Devuelve la consulta con todos los productos.
if (isset($_REQUEST['pedirProductos'])) {
    $productos = BD::CategoriasProductos();
    echo json_encode($productos);
}

//Devuelve la consulta con las categorias, recibe el nombre de la categoria.
if (isset($_REQUEST['categoria'])) {
    $categoriaRecibida = $_REQUEST['categoria'];
    $categorias = BD::imprimirConsultas($categoriaRecibida);
    echo json_encode($categorias);
}

//Devuelve la consulta con los residuos, recibe el nombre de la tabla.
if (isset($_REQUEST['claveResiduos'])) {
    $categorias = BD::imprimirConsultas('residuos');
    echo json_encode($categorias);
}

//Esto es para el admin.
//Devuelve la consulta con todos los datos de usuarios, recibe el nombre de tabla.
if (isset($_REQUEST['claveTodosUsuarios'])) {
    $categorias = BD::imprimirConsultas('usuarios');
    echo json_encode($categorias);
}