<?php
include_once "../../php/BD.class.php";
// Para que el navegador no haga cache (fecha de expiración menor a la actual)
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

// Indicamos  al navegador que va a recibir contenido JSON
header("Content-Type: application/json");

if (isset($_REQUEST['claveUsuario'])) {
    $id_usuario = $_REQUEST['claveUsuario'];
    $historial = BD::imprimirPedidos($id_usuario);
    echo json_encode($historial);
}

if (isset($_REQUEST['categoria'])) {
    $tablaCategoria = $_REQUEST['categoria'];
    $categorias = BD::imprimirConsultas($tablaCategoria);
    echo json_encode($categorias);
}
