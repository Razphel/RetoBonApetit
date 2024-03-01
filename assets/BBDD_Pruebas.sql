DROP DATABASE IF EXISTS webreto;
CREATE DATABASE IF NOT EXISTS webreto;

USE webreto;

CREATE TABLE usuarios(
id_usuarios INT AUTO_INCREMENT PRIMARY KEY,
admin BOOLEAN DEFAULT FALSE, 
nombre_usuario VARCHAR(50),
nombre VARCHAR(50),
apellido VARCHAR(50),
email VARCHAR(50) NOT NULL,
password VARCHAR(20),
activo BOOLEAN DEFAULT FALSE,
observaciones TEXT,
telefono VARCHAR(15)
);
 
CREATE TABLE solicitudes(
id_solicitudes INT AUTO_INCREMENT PRIMARY KEY,
fecha_solicitud DATE,
descripcion VARCHAR(50),
unidades VARCHAR(30),
cantidad FLOAT,
observaciones TEXT,
tramitado BOOLEAN DEFAULT FALSE,
fk_usuario INT,
 
CONSTRAINT fk_usuarios_solicitudes FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuarios)
);

CREATE TABLE proveedores(
id_proveedores INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(50),
telefono VARCHAR(15),
email VARCHAR(50),
direccion VARCHAR(100),
observaciones TEXT
);

CREATE TABLE estados(
id_estados INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100)
);

CREATE TABLE pedidos(
id_pedidos INT AUTO_INCREMENT PRIMARY KEY,
fecha_pedido DATE,
fk_proveedor INT,
fk_estado INT,
fk_usuario INT,
observaciones TEXT,

CONSTRAINT fk__pedidos_usuarios FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuarios),
CONSTRAINT fk__pedidos_estados FOREIGN KEY (fk_estado) REFERENCES estados(id_estados),
CONSTRAINT fk__pedidos_proveedores FOREIGN KEY (fk_proveedor) REFERENCES proveedores(id_proveedores)
);

CREATE TABLE linea_pedido(
id_linea_pedidos INT AUTO_INCREMENT PRIMARY KEY,
fk_pedido INT,
descripcion VARCHAR(100),
cantidad FLOAT,
unidades VARCHAR(30),
observaciones TEXT,

CONSTRAINT fk_pedidos_linea_pedido FOREIGN KEY (fk_pedido) REFERENCES pedidos(id_pedidos)
);

CREATE TABLE unidades(
id_unidades INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100),
observaciones TEXT
);

CREATE TABLE categorias(
id_categorias INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100),
imagenes VARCHAR(50),
observaciones TEXT
);

CREATE TABLE residuos(
id_residuos INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100), 
observaciones TEXT
);

CREATE TABLE productos(
id_productos INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(100),
fk_unidad INT,
observaciones TEXT,

CONSTRAINT fk_unidades_productos FOREIGN KEY (fk_unidad) REFERENCES unidades(id_unidades)
);

CREATE TABLE producto_categoria(
id_producto_categoria INT AUTO_INCREMENT PRIMARY KEY,
fk_producto INT,
fk_categoria INT,

CONSTRAINT fk_producto_categoria_categorias FOREIGN KEY (fk_categoria) REFERENCES categorias(id_categorias),
CONSTRAINT fk_producto_categoria_productos FOREIGN KEY (fk_producto) REFERENCES productos(id_productos)
);

CREATE TABLE producto_residuo(
id_producto_residuo INT AUTO_INCREMENT PRIMARY KEY,
fk_producto INT,
fk_residuo INT,

CONSTRAINT fk_producto_residuo_productos FOREIGN KEY (fk_producto) REFERENCES productos(id_productos),
CONSTRAINT fk_producto_residuo_residuos FOREIGN KEY (fk_residuo) REFERENCES residuos(id_residuos)
);

CREATE TABLE estadoresiduos(
id_estadoresiduos INT AUTO_INCREMENT PRIMARY KEY,
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

CONSTRAINT fk_residuos_generados_estadoresiduos FOREIGN KEY (fk_estadoresiduo) REFERENCES estadoresiduos(id_estadoresiduos)
);

CREATE TABLE mensajes(
id_mensajes INT AUTO_INCREMENT PRIMARY KEY,
fecha_mensaje DATE,
hora_limite TEXT,
observaciones TEXT,
fk_usuario INT,

CONSTRAINT fk_usuario_mensajes FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuarios)
);

INSERT INTO estados (descripcion) VALUES ('En reparto'),('Entregado'),('En preparacion'),('Problemas con el envio');

INSERT INTO usuarios (admin,nombre_usuario,nombre,apellido,email,password,activo,observaciones,telefono) VALUES (1,'admin','Brayan','Alfredo','admin@gmail.com','1234',1,'Observaciones pruebas','888888888');
INSERT INTO usuarios (admin,nombre_usuario,nombre,apellido,email,password,activo,observaciones,telefono) VALUES (0,'user1','Yris','Gutiérrez','usuario@gmail.com','1234',1,'Observaciones prueba','99999999');
INSERT INTO usuarios (admin,nombre_usuario,nombre,apellido,email,password,activo,observaciones,telefono) VALUES (0,'user2','Laura','Pérez','usuario@gmail.com','1234',1,'Observaciones prueba','99999999');
INSERT INTO usuarios (admin,nombre_usuario,nombre,apellido,email,password,activo,observaciones,telefono) VALUES (0,'user3','Héctor','Solana','usuario@gmail.com','1234',1,'Observaciones prueba','99999999');
INSERT INTO usuarios (admin,nombre_usuario,nombre,apellido,email,password,activo,observaciones,telefono) VALUES (0,'user4','Antonio','Costas','usuario@gmail.com','1234',1,'Observaciones prueba','99999999');

INSERT INTO proveedores (descripcion,telefono,email,direccion,observaciones) VALUES ('Carrefour','111111111','carrefour@gmail.com','Calle prueba 1, 22','Observaciones pruebas');
INSERT INTO proveedores (descripcion,telefono,email,direccion,observaciones) VALUES ('El Corte Inglés','222222222','elcorteingles@gmail.com','Calle prueba 2, 32','Observaciones prueba');
INSERT INTO proveedores (descripcion,telefono,email,direccion,observaciones) VALUES ('Mercadona','333333333','mercadona@gmail.com','Calle prueba 3, 12','Observaciones prueba');

INSERT INTO solicitudes (fecha_solicitud,descripcion,unidades,cantidad,observaciones,tramitado,fk_usuario) VALUES ('2024/02/07','huevos','cajas',6,'observaciones prueba',1,1);
INSERT INTO solicitudes (fecha_solicitud,descripcion,unidades,cantidad,observaciones,tramitado,fk_usuario) VALUES ('2025/03/12','producto','g',3.4,'Observaciones prueba',0,1);
INSERT INTO solicitudes (fecha_solicitud,descripcion,unidades,cantidad,observaciones,tramitado,fk_usuario) VALUES ('2023/12/07','producto','caja',6,'Observaciones prueba',1,1);
INSERT INTO solicitudes (fecha_solicitud,descripcion,unidades,cantidad,observaciones,tramitado,fk_usuario) VALUES ('2022/02/27','producto','kg',3.4,'Observaciones prueba',0,1);
INSERT INTO solicitudes (fecha_solicitud,descripcion,unidades,cantidad,observaciones,tramitado,fk_usuario) VALUES ('2024/04/07','producto','unidad',6,'Observaciones prueba',1,1);
INSERT INTO solicitudes (fecha_solicitud,descripcion,unidades,cantidad,observaciones,tramitado,fk_usuario) VALUES ('2024/12/17','carne','kg',3.4,'Observaciones prueba',0,1);

INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('Carnicería','Observación de prueba para carnicería','5.png');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('Pastelería','Observación de prueba para pastelería','2.png');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('Pescadería','Observación de prueba para pescadería','4.png');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('Panadería','Observación de prueba para panadería','3.png');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('Frutería','Observación de prueba para frutería','1.png');
INSERT INTO categorias (descripcion,observaciones,imagenes) VALUES ('Útiles y materiales','Observación de prueba para útiles y materiales','6.png');

INSERT INTO unidades (descripcion,observaciones) VALUES ('kg','Observación de prueba'); 
INSERT INTO unidades (descripcion,observaciones) VALUES ('g','Observación de prueba'); 
INSERT INTO unidades (descripcion,observaciones) VALUES ('litro','Observación de prueba');
INSERT INTO unidades (descripcion,observaciones) VALUES ('pack','Observación de prueba');
INSERT INTO unidades (descripcion,observaciones) VALUES ('cajita','Observación de prueba');
INSERT INTO unidades (descripcion,observaciones) VALUES ('paquete','Observación de prueba');
INSERT INTO unidades (descripcion,observaciones) VALUES ('unidad','Observación de prueba');
INSERT INTO unidades (descripcion,observaciones) VALUES ('bandeja','Observación de prueba');
INSERT INTO unidades (descripcion,observaciones) VALUES ('bolsa','Observación de prueba');

INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Bacon',1,'Observación para bacon');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Conejo',7,'Observación para conejo');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Panceta de cerdo',1,'Observación para panceta de cerdo');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Barra pan',7,'Observación de prueba para barra de pan');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Pan sándwich',7,'Observación de prueba para pan sándwich');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Pan tostadas',7,'Observación de prueba para pan tostadas');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Frambuesa fresca',5,'Observación de pruebas para frambuesa');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Grosellas',5,'Observación de pruebas para grosellas');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Harina floja',1,'Observación de pruebas para harina floja');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Arándanos',7,'Observación de pruebas para arándanos');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Naranjas',1,'Observación de prueba para naranjas');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Calabacín',1,'Observación de prueba para calabacín');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Cilantro',8,'Observación de prueba para cilantro');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Patatas',1,'Observación de prueba para patatas');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Cebollino',8,'Observación de prueba para cebollino');
INSERT INTO productos (descripcion,fk_unidad,observaciones) VALUES ('Limones',1,'Observación de prueba para limones');

INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (1,1);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (2,1);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (3,1);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (4,4);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (5,4);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (6,4);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (7,2);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (8,2);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (9,2);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (10,2);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (11,5);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (12,5);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (13,5);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (14,5);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (15,5);
INSERT INTO producto_categoria (fk_producto,fk_categoria) VALUES (16,5);

INSERT INTO pedidos (fecha_pedido,fk_proveedor,fk_estado,fk_usuario,observaciones) VALUES ('2024/02/01',1,1,2,'Observacion de prueba');
INSERT INTO pedidos (fecha_pedido,fk_proveedor,fk_estado,fk_usuario,observaciones) VALUES ('2024/02/08',2,1,2,'Observación de prueba');
INSERT INTO pedidos (fecha_pedido,fk_proveedor,fk_estado,fk_usuario,observaciones) VALUES ('2024/02/15',2,1,2,'Observación de prueba');
INSERT INTO pedidos (fecha_pedido,fk_proveedor,fk_estado,fk_usuario,observaciones) VALUES ('2024/02/22',2,1,2,'Observación de prueba');

INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'pimiento verde italiano',3,'kg','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'manzana reineta',3,'kg','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'huevos',6,'cajas','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'carne',3.4,'kg','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'patatas',6,'kg','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'limones',4,'kg','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'calabacín',8,'kg','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'grosellas',6,'kg','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'ajos',3,'kg','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (1,'bacon',4,'kg','Observación de prueba');

INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (2,'naranjas',4,'sacos','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (2,'cebollas',4,'sacos','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (2,'ajo',4,'sacos','Observación de prueba');

INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (3,'pimiento rojo',4,'sacos','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (3,'calabacín',4,'sacos','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (3,'lechuga',4,'sacos','Observación de prueba');

INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (4,'frambuesa',4,'sacos','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (4,'mantequilla',4,'sacos','Observación de prueba');
INSERT INTO linea_pedido (fk_pedido,descripcion,cantidad,unidades,observaciones) VALUES (4,'harina floja',4,'sacos','Observación de prueba');

INSERT INTO residuos (descripcion,observaciones) VALUES ('caja de papel','Observación de prueba para caja de papel');
INSERT INTO residuos (descripcion,observaciones) VALUES ('bolsa de plástico','Observación de prueba para bolsa de plástico');
INSERT INTO residuos (descripcion,observaciones) VALUES ('botella de cristal','Observación de prueba para botella de cristal');
INSERT INTO residuos (descripcion,observaciones) VALUES ('bandeja','Observación de prueba para bandeja');

INSERT INTO mensajes (fecha_mensaje, hora_limite, observaciones,fk_usuario) VALUES ('2025/02/27', 'Hora límite para solicitud 23:59', 'Observación de prueba para mensaje de administrador',1);
INSERT INTO mensajes (fecha_mensaje, hora_limite, observaciones,fk_usuario) VALUES ('2023/02/27', 'Hora límite para solicitud 2', 'Observación de prueba',1);
INSERT INTO mensajes (fecha_mensaje, hora_limite, observaciones,fk_usuario) VALUES ('2022/02/27', 'Hora límite para solicitud 3', 'Observación de prueba',1);
INSERT INTO mensajes (fecha_mensaje, hora_limite, observaciones,fk_usuario) VALUES ('2024/02/27', 'Hora límite para solicitud 4', 'Observación de prueba',1);