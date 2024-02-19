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
            $aux1 = $_REQUEST['nombreUsuario'];
            $aux2 = $_REQUEST['contraseña'];

            $sql = "SELECT id_usuario, nombre, password, admin, activo FROM usuarios WHERE nombre= '$aux1' and password= '$aux2'";

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

    public static function consultaProductos($categoria)
    {
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT * FROM productos WHERE categoria= '$categoria'";

            $resultado = $conexion->query($sql);
            $filas = [];

            while ($fila = $resultado->fetch()) {
                $filas[] = $fila;
            }
        } catch (Exception $e) {
            throw new Exception("ERROR: " + $e);
        }
        return $filas;
    }

    public static function consultaCategorias()
    {
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT * FROM categorias";

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
            $sql = "SELECT fecha_pedido,descripcion,cantidad,unidades,linea_pedido.observaciones FROM pedidos inner join linea_pedido where pedidos.fk_usuario = $usuarioInicioSesion";

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

    public static function insertarCategoria()
    {
        $resultado = false;
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT descripcion,observaciones,imagenes FROM categorias";

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

    public static function eliminarCategoria()
    {
        $respuesta = false;
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT descripcion,observaciones,imagenes FROM categorias";

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

    public static function modificarCategoria()
    {
        $respuesta = false;
        try {
            $conexion = self::conexionBD();
            $sql = "SELECT descripcion,observaciones,imagenes FROM categorias";

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
