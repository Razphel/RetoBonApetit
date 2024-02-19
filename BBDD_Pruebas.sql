DROP DATABASE IF EXISTS webreto;
CREATE DATABASE IF NOT EXISTS webreto;

USE webreto;

CREATE TABLE usuarios(
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
admin BOOLEAN DEFAULT FALSE, 
nombre VARCHAR(50),
email VARCHAR(50) NOT NULL,
password VARCHAR(20),
activo BOOLEAN DEFAULT FALSE,
observaciones TEXT,
telefono VARCHAR(15)
);
 
CREATE TABLE solicitudes(
id_solicitud INT AUTO_INCREMENT PRIMARY KEY,
fecha_solicitud DATE,
descripcion VARCHAR(50),
unidades VARCHAR(30),
cantidad FLOAT,
observaciones TEXT,
tramitado BOOLEAN DEFAULT FALSE,
fk_usuario INT,
 
CONSTRAINT fk_usuarios_solicitudes FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE proveedores(
id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(50),
telefono VARCHAR(15),
email VARCHAR(50),
direccion VARCHAR(100),
observaciones TEXT
);

CREATE TABLE estados(
id_estado INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100)
);

CREATE TABLE pedidos(
id_pedido INT AUTO_INCREMENT PRIMARY KEY,
fecha_pedido DATE,
fk_proveedor INT,
fk_estado INT,
fk_usuario INT,
observaciones TEXT,

CONSTRAINT fk__pedidos_usuarios FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario),
CONSTRAINT fk__pedidos_estados FOREIGN KEY (fk_estado) REFERENCES estados(id_estado),
CONSTRAINT fk__pedidos_proveedores FOREIGN KEY (fk_proveedor) REFERENCES proveedores(id_proveedor)
);

CREATE TABLE linea_pedido(
id_linea_pedido INT AUTO_INCREMENT PRIMARY KEY,
fk_pedido INT,
descripcion VARCHAR(100),
cantidad FLOAT,
unidades VARCHAR(30),
observaciones TEXT,

CONSTRAINT fk_pedidos_linea_pedido FOREIGN KEY (fk_pedido) REFERENCES pedidos(id_pedido)
);

CREATE TABLE unidades(
id_unidad INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100),
observar TEXT
);

CREATE TABLE categorias(
id_categoria INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100),
imagenes VARCHAR(50),
observaciones TEXT
);

CREATE TABLE residuos(
id_residuo INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100), 
observaciones TEXT
);

CREATE TABLE productos(
id_producto INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100),
fk_unidad INT,
observaciones TEXT,

CONSTRAINT fk_unidades_productos FOREIGN KEY (fk_unidad) REFERENCES unidades(id_unidad)
);

CREATE TABLE producto_categoria(
id_productos_categoria INT AUTO_INCREMENT PRIMARY KEY,
fk_producto INT,
fk_categoria INT,

CONSTRAINT fk_producto_categoria_categorias FOREIGN KEY (fk_categoria) REFERENCES categorias(id_categoria),
CONSTRAINT fk_producto_categoria_productos FOREIGN KEY (fk_producto) REFERENCES productos(id_producto)
);

CREATE TABLE producto_residuo(
id_producto_residuo INT AUTO_INCREMENT PRIMARY KEY,
fk_producto INT,
fk_residuo INT,

CONSTRAINT fk_producto_residuo_productos FOREIGN KEY (fk_producto) REFERENCES productos(id_producto),
CONSTRAINT fk_producto_residuo_residuos FOREIGN KEY (fk_residuo) REFERENCES residuos(id_residuo)
);

CREATE TABLE estadoresiduos(
id_estadoresiduo INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100),
observaciones TEXT
);

CREATE TABLE residuos_generados(
id_residuos_generados INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100),
cantidad FLOAT,
unidades VARCHAR(30),
fk_estadoresiduo INT,
observaciones TEXT,
fecha_creacion DATE,
fecha_desechado DATE,

CONSTRAINT fk_residuos_generados_estadoresiduos FOREIGN KEY (fk_estadoresiduo) REFERENCES estadoresiduos(id_estadoresiduo)
);

INSERT INTO estados (descripcion) VALUES ('En reparto'),('Entregado'),('En preparacion'),('Problemas con el envio');
INSERT INTO proveedores (descripcion,telefono,email,direccion,observaciones) VALUES ('CARREFOUR','111111111','carrefour@gmail.com','Calle prueba 1, 22','observaciones pruebas');
INSERT INTO proveedores (descripcion,telefono,email,direccion,observaciones) VALUES ('EL CORTE INGLES','222222222','elcorteingles@gmail.com','Calle prueba 2, 32','observaciones prueba');
INSERT INTO proveedores (descripcion,telefono,email,direccion,observaciones) VALUES ('MERCADONA','333333333','mercadona@gmail.com','Calle prueba 3, 12','observaciones prueba');
INSERT INTO usuarios (admin,nombre,email,password,activo,observaciones,telefono) VALUES (1,'ADMINISTRADOR1','admin1@gmail.com','1234',1,'observaciones pruebas','888888888');
INSERT INTO usuarios (admin,nombre,email,password,activo,observaciones,telefono) VALUES (0,'sagaz','usuario1@gmail.com','1235',1,'observaciones prueba','99999999');
INSERT INTO solicitudes (fecha_solicitud,descripcion,unidades,cantidad,observaciones,tramitado,fk_usuario) VALUES ('2024/02/07','huevos','cajas',6,'observaciones prueba',1,2);
INSERT INTO solicitudes (fecha_solicitud,descripcion,unidades,cantidad,observaciones,tramitado,fk_usuario) VALUES ('2024/02/07','carne','kilogramos',3.4,'observaciones prueba',0,2);
INSERT INTO pedidos (fecha_pedido,fk_proveedor,fk_estado,fk_usuario,observaciones) VALUES ('2024/02/07',1,3,2,'observacion kaladin');
INSERT INTO pedidos (fecha_pedido,fk_proveedor,fk_estado,fk_usuario,observaciones) VALUES ('2024/02/07',2,2,2,'observacion dalinar');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'huevos',6,'cajas','observacion kaladin');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'carne',3.4,'kilogramos','observacion dalinar');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (2,'patatas',4,'sacos','observacion adolin');
INSERT INTO unidades (descripcion,observar) VALUES ('cajas','observacion kaladin');
INSERT INTO unidades (descripcion,observar) VALUES ('kilogramos','observacion dalinar');
INSERT INTO unidades (descripcion,observar) VALUES ('sacos','observacion adolin');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('carne','observacion kaladin','imagen1.jpg');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('pasteleria','observacion dalinar','imagen2.jpg');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('pescado','observacion adolin','imagen3.jpg');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('panaderia','observacion sagaz','imagen4.jpg');
INSERT INTO residuos (descripcion,observaciones) VALUES ('caja de papel','observacion kaladin');
INSERT INTO residuos (descripcion,observaciones) VALUES ('bolsa de plastico','observacion dalinar');
INSERT INTO residuos (descripcion,observaciones) VALUES ('botellas de cristal','observacion adolin');
INSERT INTO residuos (descripcion,observaciones) VALUES ('malla de frutas/hortalizas','observacion sagaz');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('carne de ternera',2,'observacion kaladin');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('huevos',1,'observacion dalinar');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('patatas',2,'observacion adolin');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('tomate frito',1,'observacion sagaz');