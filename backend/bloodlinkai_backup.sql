-- MySQL dump 10.13  Distrib 9.0.1, for macos15.1 (arm64)
--
-- Host: localhost    Database: bloodlinkai
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_name` varchar(50) NOT NULL,
  `operation` varchar(10) NOT NULL,
  `record_id` int DEFAULT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_table_operation` (`table_name`,`operation`),
  KEY `idx_timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bridge_fighter_info`
--

DROP TABLE IF EXISTS `bridge_fighter_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bridge_fighter_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blood_group` varchar(255) DEFAULT NULL,
  `bridge_id` varchar(255) DEFAULT NULL,
  `bridge_name` varchar(255) DEFAULT NULL,
  `frequency_in_days` varchar(255) DEFAULT NULL,
  `no_units` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bridge_fighter_info`
--

LOCK TABLES `bridge_fighter_info` WRITE;
/*!40000 ALTER TABLE `bridge_fighter_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `bridge_fighter_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboard`
--

DROP TABLE IF EXISTS `dashboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboard` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboard`
--

LOCK TABLES `dashboard` WRITE;
/*!40000 ALTER TABLE `dashboard` DISABLE KEYS */;
/*!40000 ALTER TABLE `dashboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donors`
--

DROP TABLE IF EXISTS `donors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donors` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `blood_group` varchar(5) NOT NULL,
  `location` varchar(200) NOT NULL,
  `last_donation_date` datetime DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idx_blood_group` (`blood_group`),
  KEY `idx_location` (`location`),
  KEY `idx_last_donation_date` (`last_donation_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donors`
--

LOCK TABLES `donors` WRITE;
/*!40000 ALTER TABLE `donors` DISABLE KEYS */;
INSERT INTO `donors` VALUES ('U100','Jivin Reddy','A-','Hyderabad','2025-01-13 00:00:00','+91 6964445588','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U101','Anya Sibal','A+','Pune','2025-02-05 00:00:00','+91 8270743112','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U102','Onkar Varty','A+','Kolkata','2025-01-11 00:00:00','+91 7996408440','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U103','Shlok Kadakia','O-','Delhi','2025-05-13 00:00:00','+91 6107069269','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U104','Romil Bose','AB-','Bengaluru','2025-06-17 00:00:00','+91 8774141323','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U105','Inaaya  Char','AB+','Delhi','2025-02-25 00:00:00','+91 6761659221','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U106','Shayak Chacko','B+','Pune','2025-05-09 00:00:00','+91 7622209477','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U107','Rania Chandra','O+','Ahmedabad','2025-03-18 00:00:00','+91 9084524039','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U108','Kabir Jhaveri','O+','Mumbai','2025-01-05 00:00:00','+91 9056885554','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U109','Krish Dara','AB-','Bengaluru','2025-01-03 00:00:00','+91 8059176588','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U110','Keya Madan','B+','Hyderabad','2025-04-17 00:00:00','+91 9380210081','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U111','Ishita Mani','A+','Ahmedabad','2025-05-14 00:00:00','+91 8034834766','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U112','Rohan Tripathi','A-','Ahmedabad','2025-07-07 00:00:00','+91 8163638840','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U113','Vritika Dayal','AB-','Mumbai','2025-08-09 00:00:00','+91 9270292398','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U114','Ela Kannan','A-','Delhi','2025-05-14 00:00:00','+91 8226008296','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U115','Kabir Acharya','B-','Pune','2025-02-03 00:00:00','+91 7928577459','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U116','Jayant Wagle','B-','Hyderabad','2025-07-04 00:00:00','+91 7598939714','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U117','Elakshi Roy','B+','Pune','2025-03-05 00:00:00','+91 6470462508','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U118','Divyansh Lad','AB+','Ahmedabad','2025-06-24 00:00:00','+91 7939102906','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U119','Tanya Dalal','B+','Ahmedabad','2025-08-08 00:00:00','+91 6971933239','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U120','Anaya Sachdev','B+','Mumbai','2025-05-15 00:00:00','+91 6569060963','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U121','Mannat Agrawal','B-','Pune','2025-04-05 00:00:00','+91 7210316239','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U122','Shanaya Kibe','B-','Delhi','2025-01-12 00:00:00','+91 9990877948','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U123','Shamik Gopal','A+','Pune','2025-06-09 00:00:00','+91 7463323192','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U124','Trisha Kade','O-','Kolkata','2025-05-28 00:00:00','+91 9799775058','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U125','Aarav Dass','A-','Chennai','2025-03-28 00:00:00','+91 6067852893','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U126','Yasmin Butala','O+','Kolkata','2025-01-21 00:00:00','+91 9281419451','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U127','Vardaniya Varughese','O-','Kolkata','2025-02-12 00:00:00','+91 8678440400','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U128','Navya Varma','O+','Hyderabad','2025-03-22 00:00:00','+91 6545605330','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U129','Ira Soni','A+','Mumbai','2025-06-07 00:00:00','+91 9497731456','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U130','Neelofar Sur','O-','Ahmedabad','2025-03-18 00:00:00','+91 7231199552','2025-08-23 17:24:03','2025-08-23 17:24:03',1),('U131','Elakshi Kumer','B-','Mumbai','2025-05-08 13:12:08','+91 8334389495','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U132','Fateh Keer','A+','Ahmedabad','2025-07-20 16:15:27','+91 7217131505','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U133','Parinaaz Sodhi','A-','Kolkata','2025-05-26 00:30:53','+91 9080622012','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U134','Nitara Bath','AB-','Pune','2025-02-16 01:17:39','+91 8753813210','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U135','Anahi Edwin','O+','Bengaluru','2025-08-10 06:36:16','+91 7893690480','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U136','Vihaan Bajwa','O+','Kolkata','2025-07-05 17:26:53','+91 9849969772','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U137','Vidur Dugar','A+','Pune','2025-02-05 14:13:22','+91 6775231178','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U138','Emir Zacharia','O+','Mumbai','2025-06-15 03:20:17','+91 6648289041','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U139','Yuvraj  Baral','A-','Kolkata','2025-07-28 17:20:13','+91 9926600839','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U140','Indrajit Saini','B+','Pune','2025-07-13 23:15:05','+91 7238722382','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U141','Lakshit Issac','B-','Ahmedabad','2025-08-03 13:34:03','+91 9669242453','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U142','Emir Gera','B-','Chennai','2025-02-06 00:49:31','+91 9566911654','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U143','Miraan Sachar','O+','Chennai','2025-03-30 23:40:08','+91 6811732254','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U144','Samaira Dhawan','A+','Kolkata','2025-05-17 01:23:20','+91 8404564787','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U145','Hridaan Savant','O-','Hyderabad','2025-06-30 11:44:08','+91 6388406350','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U146','Riaan Khare','A+','Mumbai','2025-03-30 20:16:44','+91 8067021443','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U147','Sumer Chacko','A+','Delhi','2025-07-10 04:13:31','+91 9886598840','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U148','Saksham Sampath','B+','Delhi','2025-03-19 12:42:21','+91 9861507343','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U149','Sumer Jani','B-','Kolkata','2025-06-06 07:23:54','+91 7045303894','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U150','Anya Master','A-','Chennai','2025-07-23 20:17:51','+91 8573092444','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U151','Shayak Sankaran','B+','Delhi','2025-07-22 18:26:17','+91 7805832252','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U152','Zoya Shukla','A-','Hyderabad','2025-08-01 09:43:15','+91 6097761949','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U153','Neysa Bajaj','O+','Delhi','2025-04-20 22:54:24','+91 8580734938','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U154','Ishita Krish','O+','Chennai','2025-03-28 05:08:52','+91 8689805129','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U155','Kaira Bhatnagar','B+','Kolkata','2025-03-19 12:57:09','+91 6786744214','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U156','Priyansh Borde','AB-','Chennai','2025-04-21 06:38:11','+91 7052861957','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U157','Drishya Verma','AB+','Kolkata','2025-04-17 06:12:03','+91 8825591349','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U158','Saksham Khalsa','A-','Mumbai','2025-05-21 10:42:56','+91 7810551098','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U159','Hiran Sani','A-','Pune','2025-04-27 03:31:16','+91 7772633212','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U160','Aayush Gokhale','O+','Hyderabad','2025-03-11 09:22:11','+91 7530505241','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U161','Anika Sarkar','B-','Delhi','2025-05-29 17:26:28','+91 8885978293','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U162','Hrishita Devi','O-','Mumbai','2025-01-14 22:17:13','+91 8534303447','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U163','Mamooty Rattan','B-','Mumbai','2025-07-11 21:02:36','+91 6797157023','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U164','Saira Gour','AB+','Kolkata','2025-01-04 14:33:21','+91 9685623482','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U165','Saanvi Tiwari','A+','Chennai','2025-07-29 13:58:08','+91 6623975750','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U166','Veer Bhat','B+','Delhi','2025-07-17 21:17:01','+91 9586537647','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U167','Biju Aggarwal','O-','Ahmedabad','2025-06-20 07:47:56','+91 8427628496','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U168','Jivin Upadhyay','AB+','Chennai','2025-03-19 00:25:40','+91 8690533083','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U169','Veer Kala','AB-','Mumbai','2025-08-05 16:40:57','+91 7236749084','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U170','Dhruv Hari','O+','Hyderabad','2025-03-28 12:31:02','+91 9932990803','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U171','Lagan Edwin','B+','Ahmedabad','2025-02-07 18:03:31','+91 8697523973','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U172','Pari Krishna','A-','Ahmedabad','2025-04-14 17:10:01','+91 7491733270','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U173','Ritvik Verma','B+','Pune','2025-05-04 10:20:47','+91 9263375013','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U174','Jivika Sani','B+','Bengaluru','2025-06-15 14:33:19','+91 6863030920','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U175','Rania Barman','O-','Delhi','2025-01-02 20:56:56','+91 7110744976','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U176','Divij Majumdar','A+','Bengaluru','2025-01-28 12:58:23','+91 8529974465','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U177','Nayantara Gupta','A-','Mumbai','2025-03-22 16:34:54','+91 9643817370','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U178','Nitara Dhawan','AB-','Delhi','2025-08-08 11:15:48','+91 8152751832','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U179','Dhruv Borra','B-','Hyderabad','2025-01-10 10:38:35','+91 7732605189','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U180','Chirag Kohli','AB-','Delhi','2025-02-04 20:25:11','+91 6373923116','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U181','Ryan Thaman','O+','Pune','2025-04-06 19:46:01','+91 8602078947','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U182','Aarush Krishnamurthy','B+','Mumbai','2025-03-07 08:27:11','+91 7520087682','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U183','Anaya Shere','B-','Bengaluru','2025-01-10 23:51:01','+91 9816886260','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U184','Khushi Chaudhari','A-','Pune','2025-05-14 21:07:56','+91 7853705696','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U185','Romil Sama','A+','Ahmedabad','2025-05-16 19:17:50','+91 8029067178','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U186','Samarth Upadhyay','B-','Chennai','2025-04-07 15:43:19','+91 6437293503','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U187','Keya Chokshi','O+','Kolkata','2025-05-18 21:51:31','+91 8564240830','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U188','Mohanlal Sarna','A-','Kolkata','2025-05-31 10:13:19','+91 9109485801','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U189','Ehsaan Srinivasan','O+','Mumbai','2025-07-14 16:45:24','+91 9279604507','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U190','Vardaniya Tella','AB+','Pune','2025-03-31 12:59:15','+91 8920966385','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U191','Eshani Dutta','AB+','Bengaluru','2025-04-14 01:42:15','+91 6074871756','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U192','Shaan Dhar','B-','Hyderabad','2025-06-12 06:29:00','+91 8803512096','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U193','Ivana Tella','A+','Bengaluru','2025-05-01 08:15:30','+91 7251534828','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U194','Neelofar Kapur','AB+','Bengaluru','2025-04-10 07:39:37','+91 8764153279','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U195','Himmat Yogi','O+','Kolkata','2025-06-05 09:04:46','+91 9439208856','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U196','Hunar Dua','B+','Mumbai','2025-04-30 13:46:12','+91 7763820458','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U197','Himmat Kari','A+','Mumbai','2025-05-12 02:15:16','+91 8548633035','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U198','Hazel Kara','B-','Pune','2025-02-03 01:18:06','+91 9161154791','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U199','Aaina Malhotra','O-','Kolkata','2025-06-28 04:00:08','+91 8021453131','2025-08-23 22:45:46','2025-08-23 22:45:46',1),('U200','Jiya Master','A-','Kolkata','2025-02-19 23:30:08','+91 6547134937','2025-08-23 22:45:46','2025-08-23 22:45:46',1);
/*!40000 ALTER TABLE `donors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mapping_bridge_user_role`
--

DROP TABLE IF EXISTS `mapping_bridge_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mapping_bridge_user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bridge_id` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mapping_bridge_user_role`
--

LOCK TABLES `mapping_bridge_user_role` WRITE;
/*!40000 ALTER TABLE `mapping_bridge_user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `mapping_bridge_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `blood_group` varchar(5) NOT NULL,
  `location` varchar(200) NOT NULL,
  `units_needed` int DEFAULT '1',
  `urgency_level` enum('LOW','MEDIUM','HIGH','CRITICAL') DEFAULT 'MEDIUM',
  `hospital` varchar(200) DEFAULT NULL,
  `contact_phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_blood_group` (`blood_group`),
  KEY `idx_urgency` (`urgency_level`),
  KEY `idx_location` (`location`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (14,'Nishanth P','O+','chennai',1,'MEDIUM','fims','345678','2025-08-23 10:59:33','2025-08-23 10:59:33');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracker_donation`
--

DROP TABLE IF EXISTS `tracker_donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracker_donation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bridge_id` varchar(255) DEFAULT NULL,
  `donation_date` date DEFAULT NULL,
  `donation_status` varchar(255) DEFAULT NULL,
  `donation_type` varchar(255) DEFAULT NULL,
  `next_eligible_date` date DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracker_donation`
--

LOCK TABLES `tracker_donation` WRITE;
/*!40000 ALTER TABLE `tracker_donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `tracker_donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_data` (
  `user_id` varchar(255) NOT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `insert_time` datetime(6) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-24 10:30:35
