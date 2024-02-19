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


    //Con esta funcion tan solo tenemos que pasar por parametro la tabla que deseamos imprimir por pantalla con toda su información. 
    public static function imprimirConsultas($tablaImprimir)
    {
        try 
        {   
            $conexion = self::conexionBD();
            $sql = "SELECT * FROM $tablaImprimir";

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
    
    public static function imprimirPedidos($usuarioInicioSesion)
    {
        try 
        {   
            $conexion = self::conexionBD();
            $sql = "SELECT pedidos.fecha_pedido,linea_pedido.descripcion,linea_pedido.cantidad,linea_pedido.unidades,linea_pedido.observaciones 
            FROM pedidos inner join linea_pedido 
            ON pedidos.id_pedidos = linea_pedido.fk_pedido 
            where pedidos.fk_usuario = $usuarioInicioSesion";

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

    public static function ImprimirProductosCategoria($categoriaSeleccionada)
    {
        try 
        {   
            $conexion = self::conexionBD();
            $sql = "SELECT productos.descripcion AS 'nombre_producto',categorias.descripcion AS 'nombre_categoria', unidades.descripcion AS 'nombre_unidades',productos.observaciones AS 'nombre_observaciones'
            FROM unidades 
            INNER JOIN productos 
            ON unidades.id_unidades = productos.fk_unidad
            INNER JOIN producto_categoria 
            ON productos.id_productos = producto_categoria.fk_producto
            INNER JOIN categorias
            ON producto_categoria.fk_categoria = categorias.id_categorias
            WHERE producto_categoria.fk_categoria = $categoriaSeleccionada"

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

    //Esta funcion nos permitirá comprobar si existe un registro en la base de datos, de este modo podremos acceder a el para eliminarle, modificarle o crear un nuevo registro si no existe ya en la base de datos
    public static function buscarRegistro($id,$tabla)
    {   
        $respuesta = false;
        $conexion = self::conexionBD();
        $sql = "SELECT id_categorias from $tabla WHERE id_categoria = $id";
        $resultado = $conexion->query($sql);
        if($resultado->rowCount() > 0)
        {
            $respuesta = true;
        }
        return $respuesta;
    }

    public static function insertarCategoria()
    {   
        $resultado = false;
        try 
        {
            $conexion = self::conexionBD();
            $idCategoria = $_REQUEST['idCategoria'];
            $descripcionCategoria = $_REQUEST['descripcionCategoria'];
            $observacionesCategoria = $_REQUEST['observacionesCategoria'];
            $imagenesCategoria = $_REQUEST['imagenesCategoria'];
            $sql = "SELECT id_categoria from categorias WHERE id_categoria = $idCategoria";

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