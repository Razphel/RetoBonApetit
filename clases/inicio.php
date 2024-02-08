<?php
include_once 'BD.clase.php';
// $resulta = BD::imprimirConsultas('productos');
// $resulta2 = BD::imprimirConsultas('categorias');
// print_r($resulta);
// print_r($resulta2);
$buscar1 = BD::buscarRegistro(5,'productos');
$buscar2 = BD::buscarRegistro(1,'productos');
$buscar3 = BD::buscarRegistro(2,'kaldin');
$buscar4 = BD::buscarRegistro(2,'categorias');
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./js/controlUsuario.js"></script>
</head>

<body>
    <form id="login">
        <label for="nombreUsuario">ID: </label>
        <input type="text" id="nombreUsuario">

        <label for="contraseña">Contraseña: </label>
        <input type="password" id="contraseña">

        <input type="submit" id="entrar" value="Entrar">
    </form>

    <p id="salida"></p>
</body>

</html>