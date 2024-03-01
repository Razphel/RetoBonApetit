<?php
include_once '../../../assets/php/BD.php';
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

if(isset($_POST['NewUnidadMedida']))
{   
    echo var_dump($_REQUEST['NewUnidadMedida']);
    $unidadInsertar = json_decode($_REQUEST['NewUnidadMedida'],true);
    $addUnidad = BD::insertarRegistro("unidades",$unidadInsertar);
}

if(isset($_POST['NewCategoria']))
{   
    echo var_dump($_REQUEST['NewCategoria']);
    $categoriaInsertar = json_decode($_REQUEST['NewCategoria'],true);
    $addCategoria = BD::insertarRegistro("categorias",$categoriaInsertar);
}

if(isset($_POST['NewProveedor']))
{   
    echo var_dump($_REQUEST['NewProveedor']);
    $proveedorInsertar = json_decode($_REQUEST['NewProveedor'],true);
    $addProveedor = BD::insertarRegistro("proveedores",$proveedorInsertar);
}

if(isset($_POST['NewUsuario']))
{   
    echo var_dump($_REQUEST['NewUsuario']);
    $usuarioInsertar = json_decode($_REQUEST['NewUsuario'],true);
    $addUsuario = BD::insertarRegistro("usuarios",$usuarioInsertar);
}

if(isset($_POST['NewProducto']) && isset($_POST['categoriaNewProducto']) && isset($_POST['residuosNewProducto']))
{   
    echo var_dump($_REQUEST['NewProducto']);
    echo var_dump($_REQUEST['categoriaNewProducto']);
    echo var_dump($_REQUEST['residuosNewProducto']);
    $productoInsertar = json_decode($_REQUEST['NewProducto'],true);
    $categoriaNewProducto = json_decode($_REQUEST['categoriaNewProducto'],true);
    $residuosNewProducto = json_decode($_REQUEST['residuosNewProducto'],true);
    $addProducto = BD::insertarNewProductoTransaccion($productoInsertar,$categoriaNewProducto,$residuosNewProducto);
}

if (isset($_REQUEST['categorias'])) 
{
    $categorias = BD::imprimirConsultas('categorias');
    echo json_encode($categorias);
}

if (isset($_REQUEST['unidadesDeMedida'])) 
{
    $unidades = BD::imprimirConsultas('unidades');
    echo json_encode($unidades);
}

if (isset($_REQUEST['residuos'])) 
{
    $residuos = BD::imprimirConsultas('residuos');
    echo json_encode($residuos);
}

if (isset($_REQUEST['claveTodosUsuarios'])) {
    $todosUsuarios = BD::imprimirConsultas('usuarios');
    echo json_encode($todosUsuarios);
}

if (isset($_REQUEST['proveedores'])) 
{
    $proveedores = BD::imprimirConsultas('proveedores');
    echo json_encode($proveedores);
}


?>