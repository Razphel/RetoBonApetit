DROP DATABASE IF EXISTS pruebaReto;

CREATE DATABASE IF NOT EXISTS pruebaReto;

USE pruebaReto;

CREATE TABLE usuarios (
    id_usuarios INT AUTO_INCREMENT PRIMARY KEY,
    admin BOOLEAN DEFAULT FALSE,
    nombre VARCHAR(30),
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE,
    observaciones TEXT,
    telefono VARCHAR(15) NOT NULL
);

CREATE TABLE solicitudes (
    id_solicitudes INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    descripcion VARCHAR(50),
    unidades VARCHAR(30),
    cantidad TINYINT,
    observaciones TEXT,
    tramitado BOOLEAN DEFAULT FALSE,
    fk_usuario INT,
    CONSTRAINT fk_usuarios_solicitudes FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuarios)
);

INSERT INTO
    usuarios (
        admin,
        nombre,
        email,
        password,
        activo,
        observaciones,
        telefono
    )
VALUES
    (
        true,
        "adminPruebas",
        "admin@admin.com",
        "admin",
        true,
        "Administrador de pruebas.",
        "999888777"
    ),
    (
        false,
        "usuario",
        "usuario@reto.com",
        "12345",
        true,
        "Usuario de pruebas.",
        "777666555"
    );