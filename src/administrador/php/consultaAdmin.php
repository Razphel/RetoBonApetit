<?php
include_once '../../../assets/php/BD.php';
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

if (isset($_POST['NewUnidadMedida'])) {
    echo var_dump($_REQUEST['NewUnidadMedida']);
    $unidadInsertar = json_decode($_REQUEST['NewUnidadMedida'], true);
    $addUnidad = BD::insertarRegistro("unidades", $unidadInsertar);
}

if (isset($_POST['NewCategoria'])) {
    echo var_dump($_REQUEST['NewCategoria']);
    $categoriaInsertar = json_decode($_REQUEST['NewCategoria'], true);
    $addCategoria = BD::insertarRegistro("categorias", $categoriaInsertar);
}

if (isset($_POST['NewProveedor'])) {
    echo var_dump($_REQUEST['NewProveedor']);
    $proveedorInsertar = json_decode($_REQUEST['NewProveedor'], true);
    $addProveedor = BD::insertarRegistro("proveedores", $proveedorInsertar);
}

if (isset($_POST['NewUsuario'])) {
    echo var_dump($_REQUEST['NewUsuario']);
    $usuarioInsertar = json_decode($_REQUEST['NewUsuario'], true);
    $addUsuario = BD::insertarRegistro("usuarios", $usuarioInsertar);
}

if (isset($_GET['id_usuarios'])) {
    echo var_dump($_GET['id_usuarios']);
    $usuarioEliminar = json_decode($_GET['id_usuarios']);
    $elimUser = BD::eliminarRegistro("usuarios", $usuarioEliminar);
}

if (isset($_POST['NewProducto']) && isset($_POST['categoriaNewProducto']) && isset($_POST['residuosNewProducto'])) {
    echo var_dump($_REQUEST['NewProducto']);
    echo var_dump($_REQUEST['categoriaNewProducto']);
    echo var_dump($_REQUEST['residuosNewProducto']);
    $productoInsertar = json_decode($_REQUEST['NewProducto'], true);
    $categoriaNewProducto = json_decode($_REQUEST['categoriaNewProducto'], true);
    $residuosNewProducto = json_decode($_REQUEST['residuosNewProducto'], true);
    $addProducto = BD::insertarNewProductoTransaccion($productoInsertar, $categoriaNewProducto, $residuosNewProducto);
}

if (isset($_REQUEST['categorias'])) {
    $categorias = BD::imprimirConsultas('categorias');
    echo json_encode($categorias);
}

if (isset($_REQUEST['residuos'])) {
    $residuos = BD::imprimirConsultas('residuos');
    echo json_encode($residuos);
}


if (isset($_REQUEST['unidadesDeMedida'])) {
    $unidades = BD::imprimirConsultas('unidades');
    echo json_encode($unidades);
}

if (isset($_REQUEST['proveedores'])) {
    $proveedores = BD::imprimirConsultas('proveedores');
    echo json_encode($proveedores);
}
if (isset($_REQUEST['solicitudes'])) {
    $solicitudes = BD::imprimirConsultas('solicitudes');
    echo json_encode($solicitudes);
}

if (isset($_REQUEST['pedidos'])) {
    $pedidos = BD::imprimirConsultas('pedidos');
    echo json_encode($pedidos);
}


if (isset($_REQUEST['claveTodosUsuarios'])) {
    $todosUsuarios = BD::imprimirConsultas('usuarios');
    echo json_encode($todosUsuarios);
}

if (isset($_REQUEST['recibirMensajeInicio'])) {
    $mensaje = BD::imprimirMensajesInicio();
    echo json_encode($mensaje);
}

if (isset($_REQUEST['enviarNuevoMensaje'])) {
    $tabla = "mensajes";
    $mensaje = $_REQUEST['nuevoMensaje'];
    $hora = $_REQUEST['nuevaHoraLimite'];
    $id_usuario = $_REQUEST['id_usuario'];
    $fechaActual = $_REQUEST['fecha'];

    $datos = array(
        "fecha_mensaje" => $fechaActual,
        "hora_limite" => $hora,
        "observaciones" => $mensaje,
        "fk_usuario" => $id_usuario
    );

    BD::insertarRegistro($tabla, $datos);

    echo json_encode(true);
}


if (isset($_POST['NewSolicitud'])) {
    $datosSolicitudJSON = $_POST['NewSolicitud'];

    // Verificar si es un JSON válido
    if ($datosSolicitudJSON && is_string($datosSolicitudJSON)) {
        $datosSolicitud = json_decode($datosSolicitudJSON, true);

        if ($datosSolicitud !== null) {
            // Obtener el id_solicitudes del array $datosSolicitud
            $id = $datosSolicitud['id_solicitudes'] ?? null;

            // Verificar si el id_solicitudes es válido antes de continuar
            if ($id !== null) {
                // Continuar con la actualización en la base de datos
                $addActualizar = BD::actualizarTramite("solicitudes", $datosSolicitud, $id);
                echo "Actualización exitosa";
            } else {
                echo "Error: id_solicitudes no válido";
            }
        } else {
            echo "Error al decodificar el JSON";
        }
    } else {
        echo "Solicitud no es un JSON válido";
    }
}
