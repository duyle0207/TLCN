-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: dhpro
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tensp` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `gia` int(11) DEFAULT NULL,
  `mausac` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `trongluong` float DEFAULT NULL,
  `kichthuoc` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `amthanh` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `conggiaotiep` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `dophangiaiwc` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `cpu` int(11) DEFAULT NULL,
  `ocung` int(11) DEFAULT NULL,
  `ram` int(11) DEFAULT NULL,
  `carddohoa` int(11) DEFAULT NULL,
  `manhinh` int(11) DEFAULT NULL,
  `pin` int(11) DEFAULT NULL,
  `hedieuhanh` int(11) DEFAULT NULL,
  `thuonghieu` int(11) DEFAULT NULL,
  `nhucausudung` int(11) DEFAULT NULL,
  `soluong` int(11) DEFAULT NULL,
  `hinh` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `tomtat` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `dophangiai` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `sp_cpu_idx` (`cpu`),
  KEY `sp_ocung_idx` (`ocung`),
  KEY `sp_ram_idx` (`ram`),
  KEY `sp_carddohoa_idx` (`carddohoa`),
  KEY `sp_manhinh_idx` (`manhinh`),
  KEY `sp_thuonghieu_idx` (`thuonghieu`),
  KEY `sp_pin_idx` (`pin`),
  KEY `sp_hedieuhanh_idx` (`hedieuhanh`),
  KEY `sp_nhucausudung_idx` (`nhucausudung`),
  CONSTRAINT `sp_carddohoa` FOREIGN KEY (`carddohoa`) REFERENCES `carddohoa` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sp_cpu` FOREIGN KEY (`cpu`) REFERENCES `cpu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sp_hedieuhanh` FOREIGN KEY (`hedieuhanh`) REFERENCES `hedieuhanh` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sp_manhinh` FOREIGN KEY (`manhinh`) REFERENCES `manhinh` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sp_nhucausudung` FOREIGN KEY (`nhucausudung`) REFERENCES `nhucausudung` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sp_ocung` FOREIGN KEY (`ocung`) REFERENCES `ocung` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sp_pin` FOREIGN KEY (`pin`) REFERENCES `pin` (`id`),
  CONSTRAINT `sp_ram` FOREIGN KEY (`ram`) REFERENCES `ram` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sp_thuonghieu` FOREIGN KEY (`thuonghieu`) REFERENCES `thuonghieu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-08 10:55:23
