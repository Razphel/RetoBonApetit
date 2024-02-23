<?php
include_once '../../clases/BD.clase.php';
// Para que el navegador no haga cache (fecha de expiración menor a la actual)
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

// Indicamos  al navegador que va a recibir contenido JSON

if (isset($_REQUEST['claveUsuario'])) {
    $id_usuario = $_REQUEST['claveUsuario'];
    $historial = BD::imprimirPedidos($id_usuario);
    echo json_encode($historial);
} 

if(isset($_REQUEST['claveProveedores']))
{
    $proveedores = BD::imprimirConsultas('proveedores');
    echo json_encode($proveedores);
}

if(isset($_REQUEST['claveUsuarioInicioSolicitud']))
{
    $claveUsuarioInicioSolicitud = BD::imprimirSolicitudesInicio('claveUsuarioInicioSolicitud');
    echo json_encode($claveUsuarioInicioSolicitud);
}

if (isset($_REQUEST['categoria'])) 
{
    $categorias = BD::imprimirConsultas('categorias');
    echo json_encode($categorias);
}

if (isset($_REQUEST['claveResiduos'])) 
{
    $residuos = BD::imprimirConsultas('residuos');
    echo json_encode($residuos);
}

if (isset($_REQUEST['claveTodosUsuarios'])) 
{
    $usuarios = BD::imprimirConsultas('usuarios');
    echo json_encode($usuarios);
}

if(isset($_POST['datos']))
{   
    // echo var_dump($_REQUEST['datos']);
    //Debemos colocar el true delante para asegurarnos que los datos que le pasmos a la funcion se interpreten como un array asociativo
    $datosInsertar = json_decode($_REQUEST['datos'],true);
    // echo var_dump($datosInsertar);
    $add = BD::insertarRegistro("categorias",$datosInsertar);
} 