<?php
include_once '../../clases/BD.clase.php';
// Para que el navegador no haga cache (fecha de expiración menor a la actual)
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

// Indicamos  al navegador que va a recibir contenido JSON
header("Content-Type: application/json");


    $residuos = BD::imprimirConsultas('residuos');
    echo json_encode($residuos);
?>