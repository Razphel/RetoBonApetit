<?php
include_once '../../../assets/php/BD.php'; // Para que el navegador no haga cache (fecha de expiración menor a la actual)
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

// Indicamos  al navegador que va a recibir contenido JSON

if (isset($_REQUEST['claveUsuario'])) {
    $id_usuario = $_REQUEST['claveUsuario'];
    $historial = BD::imprimirPedidos($id_usuario);
    echo json_encode($historial);
}

if (isset($_REQUEST['claveProveedores'])) {
    $proveedores = BD::imprimirConsultas('proveedores');
    echo json_encode($proveedores);
}

if (isset($_REQUEST['claveUsuarioInicioSolicitud'])) {
    $claveUsuarioInicioSolicitud = BD::imprimirSolicitudesInicio('claveUsuarioInicioSolicitud');
    echo json_encode($claveUsuarioInicioSolicitud);
}

if (isset($_REQUEST['categoria'])) {
    $categorias = BD::imprimirConsultas('categorias');
    echo json_encode($categorias);
}


if (isset($_REQUEST['claveResiduos'])) {
    $residuos = BD::imprimirConsultas('residuos');
    echo json_encode($residuos);
}

//Devuelve la consulta con todos los productos.
if (isset($_REQUEST['pedirProductos'])) {
    $productos = BD::CategoriasProductos();
    echo json_encode($productos);
}

if (isset($_REQUEST['mensajesInicio'])) {
    $mensajes = BD::imprimirMensajesInicio('mensajes');
    echo json_encode($mensajes);
}

if (isset($_REQUEST['residuos'])) {
    $residuos = BD::imprimirResiduos();
    echo json_encode($residuos);
}

if (isset($_REQUEST['unidadesDeMedida'])) 
{
    $unidades = BD::imprimirConsultas('unidades');
    echo json_encode($unidades);
}

if(isset($_POST['NewSolicitud']))
{   
    echo var_dump($_REQUEST['NewSolicitud']);
    $solicitudInsertar = json_decode($_REQUEST['NewSolicitud'],true);
    $addSolicitud = BD::insertarRegistro("solicitudes",$solicitudInsertar);
}