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
    $categoriaInsertar = json_decode($_REQUEST['NewProveedor'],true);
    $addCategoria = BD::insertarRegistro("proveedores",$categoriaInsertar);
}

if (isset($_REQUEST['categorias'])) 
{
    $categorias = BD::imprimirConsultas('categorias');
    echo json_encode($categorias);
}

if (isset($_REQUEST['unidades'])) 
{
    $unidades = BD::imprimirConsultas('unidades');
    echo json_encode($unidades);
}

if (isset($_REQUEST['proveedores'])) 
{
    $proveedores = BD::imprimirConsultas('proveedores');
    echo json_encode($proveedores);
}
?>