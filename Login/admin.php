<?php
session_start();



if (!isset($_SESSION['id_usuario']) || !isset($_SESSION['admin']) || !isset($_SESSION['nombre'])) {
    header("Location: login.php");
    exit();
}

$adminNombre = $_SESSION['nombre'];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
</head>
<body>
    <h2>Bienvenido <?php echo $adminNombre; ?>!</h2>
    <p>Página de administrador.</p>
    <a href="logout.php">Cerrar sesion</a>
</body>
</html>
