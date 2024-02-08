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
        $conexion = conexion();
        $nombreUsuario = $_REQUEST['nombreUsuario'];
        $contraseñaUsuario = $_REQUEST['contraseña'];

        $sql = "SELECT nombre, password, admin FROM usuarios WHERE nombre= '$nombreUsuario' and password= '$contraseñaUsuario'";

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

    public static function consultaCategorias()
    {
        try 
        {
            $conexion = self::conexionBD();
            $sql = "SELECT * FROM categorias";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) 
            {
                $filas[] = $fila;
            }
        }   
            catch (Exception $e) 
            {
                throw new Exception("ERROR: " + $e);
            }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }

    public static function insertarCategoria()
    {
        $resultado = false;
        try 
        {
            $conexion = self::conexionBD();
            $sql = "SELECT descripcion,observaciones,imagenes FROM categorias";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) 
            {
                $filas[] = $fila;
            }
        } 
            catch (Exception $e) 
            {
            throw new Exception("ERROR: " + $e);
            }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }

    public static function eliminarCategoria()
    {
        $respuesta = false;
        try 
        {
            $conexion = self::conexionBD();
            $sql = "SELECT descripcion,observaciones,imagenes FROM categorias";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) 
            {
                $filas[] = $fila;
            }
        } 
            catch (Exception $e) 
            {
            throw new Exception("ERROR: " + $e);
            }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }

    public static function modificarCategoria()
    {
        $respuesta = false;
        try 
        {
            $conexion = self::conexionBD();
            $sql = "SELECT descripcion,observaciones,imagenes FROM categorias";

            $resultado = $conexion->query($sql);

            // Crear un array para almacenar todas las filas        
            $filas = [];
            // Recorrer los resultados y almacenar cada fila en el array        
            while ($fila = $resultado->fetch()) {
                $filas[] = $fila;
            }
        } 
            catch (Exception $e) 
            {
            throw new Exception("ERROR: " + $e);
            }
        //Esta consulta te devuelve un array de arrays con todos los datos de la tabla producto.
        return $filas;
    }
}

?>