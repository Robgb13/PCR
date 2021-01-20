CREATE DATABASE  IF NOT EXISTS `pcr` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pcr`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: pcr
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `idempresas` int NOT NULL AUTO_INCREMENT,
  `nombreempresas` varchar(45) NOT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `codigopostal` varchar(45) DEFAULT NULL,
  `idusuario` int NOT NULL,
  PRIMARY KEY (`idempresas`),
  UNIQUE KEY `nombre_UNIQUE` (`nombreempresas`),
  KEY `fk_empresas_usuarios_idx` (`idusuario`),
  CONSTRAINT `fk_empresas_usuarios` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idproducto` int NOT NULL AUTO_INCREMENT,
  `producto` varchar(45) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `cantidad` int NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `codigopostal` varchar(7) DEFAULT NULL,
  `idusuario` int NOT NULL,
  PRIMARY KEY (`idproducto`),
  UNIQUE KEY `idmaterial_UNIQUE` (`idproducto`),
  KEY `fk_producto_usuarios1_idx` (`idusuario`),
  CONSTRAINT `fk_producto_usuarios1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Cajas','Madera',4,'Cajas medianas de fruta','08013',6),(2,'cajonera','madera',1,'Cajonera de tres cajones','08029',3),(3,'paneles','plástico',4,'Cuatro paneles de plastico de 2x1.3m','08035',4),(4,'botellas','Vidrio',50,'33cl','08011',6),(5,'jaula','metal',50,'yoquese','08011',6),(6,'Palets','Madera',2,'Tamaño grande','08004',1),(7,'Prendas de algodon','Tela',3,'Algodon 100%','08002',5),(8,'Prendas de poliester','Tela',2,'Poliester 100%','08003',1),(9,'Botella','Vidrio',1,'sasfa','08005',1),(10,'Cojin','',3,'Cojin de tela verde','08004',5),(11,'Cajas','Plástico',2,'','08004',6),(12,'Cajas','Plástico',3,'','08004',4);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacciones` (
  `idtransacciones` int NOT NULL AUTO_INCREMENT,
  `idusuario` int DEFAULT NULL,
  `idproducto` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `estado` varchar(15) NOT NULL,
  PRIMARY KEY (`idtransacciones`),
  KEY `fk_transacciones_productos1_idx` (`idproducto`),
  KEY `fk_transacciones_usuarios1_idx` (`idusuario`),
  CONSTRAINT `fk_transacciones_productos1` FOREIGN KEY (`idproducto`) REFERENCES `productos` (`idproducto`),
  CONSTRAINT `fk_transacciones_usuarios1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacciones`
--

LOCK TABLES `transacciones` WRITE;
/*!40000 ALTER TABLE `transacciones` DISABLE KEYS */;
INSERT INTO `transacciones` VALUES (1,1,1,4,'espera'),(2,1,3,3,'espera'),(3,1,4,49,'espera'),(4,1,5,43,'espera'),(5,1,8,2,'espera'),(6,5,1,4,'espera'),(7,5,2,1,'espera'),(8,6,1,3,'espera'),(9,4,1,3,'espera');
/*!40000 ALTER TABLE `transacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) NOT NULL,
  `password` varchar(15) NOT NULL,
  `correo` varchar(70) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Antonio','Perreo','Antonio60','qwerty123','antonio60@asd.com'),(2,'Jose','Perez','JoseTop','qwerty123','josem@asd.com'),(3,'Edwin','Leal','EdwinLeal','12345','edwin@correo.com'),(4,'Luis','Cardona','LuisCar','abcde','luis@correo.com'),(5,'Roberto','Garcia','Rgb','1234','roberto@gmail.com'),(6,'Rigoberto','Lopez','Rlb','2345','rigoberto@gmail.com');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-20 11:14:31
