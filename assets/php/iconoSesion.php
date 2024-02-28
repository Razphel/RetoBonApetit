<?php
// Para que el navegador no haga cache (fecha de expiración menor a la actual)
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

if (isset($_REQUEST['iconoUsuario'])) {
    session_start();

    // Función para generar un color aleatorio
    function getRandomColor()
    {
        $letters = '0123456789ABCDEF';
        $color = '#';
        for ($i = 0; $i < 6; $i++) {
            $color .= $letters[rand(0, 15)];
        }
        return $color;
    }

    // Si el icono de usuario no está definido en la sesión, genera uno nuevo
    if (!isset($_SESSION['iconoUsuario'])) {
        $iconoUsuario = getRandomColor();
        $_SESSION['iconoUsuario'] = $iconoUsuario;
    } else {
        // Si ya está definido, usa el que ya está guardado en la sesión
        $iconoUsuario = $_SESSION['iconoUsuario'];
    }

    // Devuelve solo el valor del color del icono de usuario como respuesta
    echo json_encode($iconoUsuario);
}

if (isset($_REQUEST['cerrarSesion'])) {
    //Aqui hay que iniciar la sesion antes de borrar sus variables.
    session_start();
    session_destroy();
}
