<?php
session_start();

if (!isset($_SESSION['id_usuario']) || !isset($_SESSION['admin']) || !isset($_SESSION['nombre'])) {
    header("Location: login.php");
    exit();
}


$usuarioNombre = $_SESSION['nombre'];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
</head>
<body>
    <h2>Bienvenido <?php echo $usuarioNombre; ?>!</h2>
    <p>Página de usuario.</p>
    <a href="logout.php">Cerrar sesion</a>
</body>
</html>
