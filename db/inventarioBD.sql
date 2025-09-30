-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para inventariodb
CREATE DATABASE IF NOT EXISTS `inventariodb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `inventariodb`;

-- Volcando estructura para tabla inventariodb.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Stock` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla inventariodb.productos: ~1 rows (aproximadamente)
INSERT INTO `productos` (`Id`, `Nombre`, `Descripcion`, `Categoria`, `Imagen`, `Precio`, `Stock`) VALUES
	(2, 'Manzana', 'Rojas', 'Frutas', '', 0.25, 2),
	(3, 'Pera', 'Es una fruta', 'Fruta', '', 0.60, 50);

-- Volcando estructura para tabla inventariodb.transacciones
CREATE TABLE IF NOT EXISTS `transacciones` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `Tipo` enum('compra','venta') NOT NULL,
  `ProductoId` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `PrecioUnitario` decimal(10,2) NOT NULL,
  `PrecioTotal` decimal(10,2) NOT NULL,
  `Detalle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Transacciones_Productos` (`ProductoId`),
  CONSTRAINT `FK_Transacciones_Productos` FOREIGN KEY (`ProductoId`) REFERENCES `productos` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla inventariodb.transacciones: ~5 rows (aproximadamente)
INSERT INTO `transacciones` (`Id`, `Fecha`, `Tipo`, `ProductoId`, `Cantidad`, `PrecioUnitario`, `PrecioTotal`, `Detalle`) VALUES
	(1, '2025-09-29 00:00:00', 'compra', 2, 4, 0.25, 1.00, 'Compra 4 manzanas'),
	(2, '2025-09-29 00:00:00', 'venta', 2, 5, 0.25, 1.25, 'Venta de 5 manzanas'),
	(3, '2025-09-29 12:35:57', 'compra', 2, 4, 0.25, 1.00, 'Compra 4 manzanas'),
	(4, '2025-09-29 12:36:53', 'venta', 2, 4, 0.25, 1.00, 'Se venden 4 manzanas'),
	(5, '2025-09-29 07:50:59', 'venta', 2, 1, 0.25, 0.25, 'Se vendio 1 manzana'),
	(6, '2025-09-29 08:23:27', 'venta', 2, 8, 0.25, 2.00, 'Compra todas las manzanas');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
