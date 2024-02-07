<?php
session_start();

require_once './include/conexion.php'; 
require_once './include/DB.php'; 

class Login extends DB {

    
    public static function iniciarSesion($email, $password) {
        // Hago consulta y un array asociativo con marcadores de posicion :email y :password
        $sql = "SELECT * FROM usuarios WHERE email = :email AND password = :password"; 
        $parametros = array(':email' => $email, ':password' => $password);

        //Ejecuto la consulta 
        $resultado = self::ejecutaConsulta($sql, $parametros);

        //verifico la consulta
        if ($resultado) {
            $usuario = $resultado->fetch(PDO::FETCH_ASSOC);
            //verifica usuario y se hacen variables d sesion
            if ($usuario) {
                $_SESSION['id_usuario'] = $usuario['id_usuarios'];
                $_SESSION['admin'] = $usuario['admin'];
                $_SESSION['nombre'] = $usuario['nombre'];

                // si el usuario es admin se va a la pagina de admin.php y sino a user.php
                if ($usuario['admin']) {
                    header("Location: admin.php");
                } else {
                    header("Location: user.php");
                }
            } else {
                echo "Usuario o contraseña incorrectos.";
            }
        } 
    }
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    Login::iniciarSesion($email, $password);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form method="POST" action="">
        <label>Email:</label>
        <input type="text" name="email" required><br>

        <label>Contraseña:</label>
        <input type="password" name="password" required><br>

        <input type="submit" value="Login">
    </form>
</body>
</html>
