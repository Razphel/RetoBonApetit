<?php
// Para que el navegador no haga cache (fecha de expiración menor a la actual)
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

// Indicamos  al navegador que va a recibir contenido JSON
header("Content-Type: application/json");

function conexion()
{
    $resultado = false;
    try {
        $servidor = "localhost";
        $basedatos = "pruebareto";
        $usuario = "dwes";
        $password = "abc123.";
        $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

        $conexion = new PDO('mysql:host=' . $servidor . ';dbname=' . $basedatos, $usuario, $password, $opciones);

        //Configura el nivel de error
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $resultado = $conexion;
    } catch (PDOException $p) {
        echo "<p>Error al conectar " . $p->getMessage() . "</p>";
        $resultado = true;
        exit();
    }
    return $resultado;
}

function consultaUsuario()
{
    $respuesta = false;
    try {
        $conexion = conexion();
        $aux1 = $_REQUEST['nombreUsuario'];
        $aux2 = $_REQUEST['contraseña'];

        $sql = "SELECT nombre, password FROM usuarios WHERE nombre= '$aux1' and password= '$aux2'";

        // $preparada = $conexion->prepare($sql);
        // $preparada->bindParam(':nombre', $_REQUEST['nombre']);
        // $preparada->bindParam(':password', $_REQUEST['password']);
        // $preparada->execute();

        $resultado = $conexion->query($sql);

        $fila = $resultado->fetch();
        if (isset($fila)) {
            $respuesta = true;
        }
    } catch (Exception $e) {
        throw new Exception("ERROR: " + $e);
    }
    return $respuesta;
}


echo json_encode(consultaUsuario());
