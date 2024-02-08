<?php
// Para que el navegador no haga cache (fecha de expiración menor a la actual)
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

// Indicamos  al navegador que va a recibir contenido JSON
header("Content-Type: application/json");
include_once '../clases/BD.clase.php';

$tabla = $_REQUEST['tabla'];

$resultado = BD::imprimirConsultas($tabla);

// $resulta = BD::imprimirConsultas('productos');
// $resulta2 = BD::imprimirConsultas('categorias');
// $resulta3 = BD::imprimirConsultas('estados');
// $resulta4 = BD::imprimirConsultas('unidades');
// $resulta5 = BD::imprimirConsultas('proveedores');
// $resulta6 = BD::imprimirConsultas('residuos');


echo json_encode($resultado);
