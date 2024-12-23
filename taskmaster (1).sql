-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2024 at 11:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskmaster`
--
CREATE DATABASE IF NOT EXISTS `taskmaster` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `taskmaster`;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `title` varchar(150) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `priority` varchar(50) NOT NULL,
  `dead_line` varchar(100) NOT NULL,
  `stamp_date` varchar(150) NOT NULL,
  `task_id` varchar(150) NOT NULL,
  `color` varchar(50) NOT NULL,
  `user_id` varchar(150) NOT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`title`, `description`, `priority`, `dead_line`, `stamp_date`, `task_id`, `color`, `user_id`) VALUES
('AGain', 'ssss', 'Low', '2024-11-29', '2024-11-24 09:54:50', 't170278e1-4acf-4f36-b0d6-8fa72f03acde', 'primary-bg', 'eb476819-b812-48e6-a641-ba8a01c5db0f'),
('Edited Task something removed again', 'Hello I just edited the task', 'Medium', '2024-11-30', '2024-11-24 10:01:30', 'tc4b0e594-45bc-4dcd-b1ff-d85d068c6b7e', 'secondary-bg', 'eb476819-b812-48e6-a641-ba8a01c5db0f');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` varchar(150) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `reg_date` varchar(150) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `phone`, `password`, `reg_date`) VALUES
('1323d583-6ab4-4e6b-820a-d91ca990c68b', '0', 'fatai@gmaiil.com', NULL, '124534a0ae447b0872b3092731a37d8e', '2024-11-24 09:10:26'),
('72ea9d81-1ecf-4ab5-a67c-10d2e26a2b24', '0', 'test@gmail.com', NULL, '0cc175b9c0f1b6a831c399e269772661', '2024-11-24 09:08:08'),
('ae68d4a4-7461-47f1-af50-1604bf913128', 'New Test', 'test@gmail.com', NULL, '0cc175b9c0f1b6a831c399e269772661', '2024-11-24 09:43:27'),
('ea710edc-61b4-4085-bfd4-ecf3185e4a40', 'Lord Frayo', 'lord@gmail.com', NULL, '0cc175b9c0f1b6a831c399e269772661', '2024-11-24 09:12:19'),
('eb476819-b812-48e6-a641-ba8a01c5db0f', 'Gabriel Kehinde Peter', 'gabrielkehinde001@gmail.com', NULL, '0cc175b9c0f1b6a831c399e269772661', '2024-11-24 09:19:55'),
('f9102253-cffe-4efe-805b-b7154be9a267', 'Gabriel Kehinde Peter', 'fatai@gmaiil.com', NULL, '4124bc0a9335c27f086f24ba207a4912', '2024-11-24 09:15:22');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
