<?php

class BD
{
    //En este caso no haremos uso de un constructor, ya que definiremos de primeras los atributos y definiremos los metodos como estaticos
    private static $servidor = "localhost";
    private static $basedatos = "webreto";
    private static $usuario = "dwes";
    private static $password = "abc123.";

    public function __get($atributo)
    {
        if (property_exists($this, $atributo)) {
            return $this->$atributo;
        }
    }
    public function __set($atributo, $valor)
    {
        if (property_exists($this, $atributo)) {
            $this->$atributo = $valor;
        }
    }

    public static function conexionBD()
    {
        $resultado = false;
        try {

            $conexion = new PDO('mysql:host=' . self::$servidor . ';dbname=' . self::$basedatos, self::$usuario, self::$password);

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

    public static function consultaUsuario()
    {
        $respuesta = false;
        try {
            $conexion = self::conexionBD();
            $nombreUsuario = $_REQUEST['nombreUsuario'];
            $contraseña = $_REQUEST['contraseña'];

            $sql = "SELECT id_usuarios, nombre_usuario, nombre, apellido, password, admin, activo FROM usuarios WHERE nombre_usuario= '$nombreUsuario' and password= '$contraseña'";

            // $preparada = $conexion->prepare($sql);
            // $preparada->bindParam(':nombre', $_REQUEST['nombre']);
            // $preparada->bindParam(':password', $_REQUEST['password']);
            // $preparada->execute();

            $resultado = $conexion->query($sql);

            $fila = $resultado->fetch();
            if ($fila) {
                $respuesta = $fila;
            } else {
                $respuesta = false;
            }
        } catch (Exception $e) {
            throw new Exception("ERROR: " + $e);
        }
        return $respuesta;
    }


    //Con esta funcion tan solo tenemos que pasar por parametro la tabla que deseamos imprimir por pantalla con toda su información. 
    public static function imprimirConsultas($tablaImprimir)
    {
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT * FROM $tablaImprimir";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) {
                $filas[] = $fila;
            }
        } catch (Exception $e) {
            throw new Exception("ERROR: " + $e);
        }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }

    public static function imprimirSolicitudesInicio($usuarioInicioSesion)
    {
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT fecha_solicitud,descripcion,unidades, cantidad,observaciones 
            FROM solicitudes 
            WHERE fk_usuario = 2
            ORDER BY fecha_solicitud DESC
            LIMIT 3";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) {
                $filas[] = $fila;
            }
        } catch (Exception $e) {
            throw new Exception("ERROR: " + $e);
        }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }

    public static function imprimirPedidos($usuarioInicioSesion)
    {
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT pedidos.fecha_pedido,linea_pedido.descripcion,linea_pedido.cantidad,linea_pedido.unidades,linea_pedido.observaciones 
            FROM pedidos inner join linea_pedido 
            ON pedidos.id_pedidos = linea_pedido.fk_pedido 
            where pedidos.fk_usuario = $usuarioInicioSesion";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) {
                $filas[] = $fila;
            }
        } catch (Exception $e) {
            throw new Exception("ERROR: " + $e);
        }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }

    public static function CategoriasProductos()
    {
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT categorias.id_categorias AS 'Id_categoria', categorias.imagenes AS 'Imagen_categoria', productos.descripcion AS 'nombre_producto',categorias.descripcion AS 'nombre_categoria', unidades.descripcion AS 'nombre_unidades',productos.observaciones AS 'nombre_observaciones'
            FROM unidades 
            INNER JOIN productos 
            ON unidades.id_unidades = productos.fk_unidad
            INNER JOIN producto_categoria 
            ON productos.id_productos = producto_categoria.fk_producto
            INNER JOIN categorias
            ON producto_categoria.fk_categoria = categorias.id_categorias";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) {
                $filas[] = $fila;
            }
        } catch (Exception $e) {
            throw new Exception("ERROR: " + $e);
        }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }

    //Con la intencionalidad de que la siguiente funcion sea capaz de insertar datos en cualquier tabla, pasaremos por parametro el nombre de la tabla y un array asociativo en el cual 
    //el array_key serán los campos del registro y el valor asociado serán los datos que queremos introducir en la base de datos
    public static function insertarRegistro($tabla, $datos)
    {
        try {
            $conexion = self::conexionBD();
            $columnas = implode(', ', array_keys($datos));
            // var_dump(array_keys($datos));
            // echo "<br>".$columnas;
            //Con array_fill indicaremos que la cadena empiece en la posicion 0, tendrá la misma longitud que el numero de datos que haya
            $valores = implode(', ', array_fill(0, count($datos), '?'));

            $sql = "INSERT INTO $tabla ($columnas) VALUES ($valores)";
            $consulta = $conexion->prepare($sql);

            // Ejecutar la consulta preparada con los valores
            $consulta->execute(array_values($datos));
            return true;
        } catch (PDOException $e) {
            throw new Exception("ERROR: " . $e->getMessage());
        }
    }

    public static function eliminarRegistro($tabla, $id)
    {
        try {
            $conexion = self::conexionBD();
            $sql = "DELETE FROM $tabla where id_$tabla =" . $id;
            $resultado = $conexion->exec($sql);
            return true;
        } catch (PDOException $e) {
            throw new Exception("ERROR: " . $e->getMessage());
        }
    }

    public static function actualizarRegistro($tabla, $datos, $id)
    {
        try {
            $conexion = self::conexionBD();
            foreach ($datos as $columna => $value) {
                $columnas_valores[] = "$columna = ?";
            }
            $columnas_valores = implode(",", $columnas_valores);
            $sql = "UPDATE $tabla SET $columnas_valores WHERE id_$tabla = $id";
            $consulta = $conexion->prepare($sql);

            // Ejecutar la consulta preparada con los valores
            $consulta->execute(array_values($datos));
            return true;
        } catch (PDOException $e) {
            throw new Exception("ERROR: " . $e->getMessage());
        }
    }

    // $datos1 = [
    //     "admin" => "1",
    //     "nombre_usuario" => "Coral",
    //     "nombre" => "Corey",
    //     "apellido" => "Isbell",
    //     "email" => "coreyisbell22@gmail.com",
    //     "password" => "0000",
    //     "activo" => 1,
    //     "observaciones" => "es un friki",
    //     "telefono" => "666666666"
    // ];
    // BD::insertarRegistro("usuarios",$datos1);
    // $datos2 = [
    //     "descripcion" => "marisco",
    //     "imagenes" => "pesacado.png",
    //     "observaciones" => "El pescado es mejor",
    // ];
    // BD::insertarRegistro("categorias",$datos2);
    // BD::eliminarRegistro("usuarios",7);
    // $datos3 = [
    //     "descripcion" => "ODIOELMARISCO",
    //     "imagenes" => "marisco.png",
    //     "observaciones" => "VIVA EL PESCADO"
    // ];
    // $id = 7;
    // BD::actualizarRegistro("categorias",$datos3,$id);
    //CREAR CONSULTA QUE IMPRIME LAS TRES ULTIMAS SOLICITUDES PARA EL ADMINISTRADOR

    public static function imprimirMensajesInicio()
    {
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT fecha_mensaje, hora_limite, observaciones
            FROM mensajes 
            ORDER BY fecha_mensaje DESC
            LIMIT 1";

            $resultado = $conexion->query($sql);

            $fila = $resultado->fetch();
        } catch (Exception $e) {
            throw new Exception("ERROR: " + $e);
        }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $fila;
    }

    public static function imprimirResiduos()
    {
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT productos.descripcion AS 'descripcion_productos', residuos.descripcion AS 'descripcion_residuos', residuos.observaciones AS 'observaciones_residuos'
            FROM productos 
            INNER JOIN producto_residuo
            ON productos.id_productos = producto_residuo.fk_producto
            INNER JOIN residuos
            ON producto_residuo.fk_residuo = residuos.id_residuos";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) {
                $filas[] = $fila;
            }
        } catch (Exception $e) {
            throw new Exception("ERROR: " + $e);
        }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }
}