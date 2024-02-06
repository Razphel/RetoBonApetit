<?php

require_once 'conexion.php';

class DB {

    protected static function ejecutaConsulta($sql, $parametros = array()) {
        global $dwes;
        $resultado = null;

        if (isset($dwes)) {
            try {
                $stmt = $dwes->prepare($sql);
                $stmt->execute($parametros);
                $resultado = $stmt;
            } catch (PDOException $e) {

                echo 'Error en la consulta: ' . $e->getMessage();
            }
        }

        return $resultado;
    }



}

?>
