-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 12, 2025 at 03:39 PM
-- Server version: 10.11.13-MariaDB
-- PHP Version: 8.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `habittracker-dev`
--
CREATE DATABASE IF NOT EXISTS `habittracker-dev` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `habittracker-dev`;

-- --------------------------------------------------------

--
-- Table structure for table `Checkin`
--

CREATE TABLE `Checkin` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `Habit` bigint(20) UNSIGNED NOT NULL,
  `Streak` bigint(20) UNSIGNED DEFAULT NULL,
  `date` timestamp NOT NULL,
  `impact` enum('positive','negative') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Checkin`
--

INSERT INTO `Checkin` (`ID`, `Habit`, `Streak`, `date`, `impact`) VALUES
(2, 5, 4, '2025-09-12 15:35:15', 'positive'),
(3, 6, 5, '2025-09-12 15:37:23', 'positive');

-- --------------------------------------------------------

--
-- Table structure for table `Habit`
--

CREATE TABLE `Habit` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `lastStreak` bigint(20) UNSIGNED DEFAULT NULL,
  `title` tinytext NOT NULL,
  `description` text NOT NULL,
  `type` enum('pro','anti') NOT NULL,
  `rule` time DEFAULT NULL COMMENT 'time between two checkins'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Habit`
--

INSERT INTO `Habit` (`ID`, `lastStreak`, `title`, `description`, `type`, `rule`) VALUES
(5, 4, 'sport', 'zwei mal die woche', 'pro', '84:00:00'),
(6, 5, 'ordnung/kleidung', 'beim umziehen kleidung direkt wegräumen', 'anti', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `habit-checkin-streak-overview`
-- (See below for the actual view)
--
CREATE TABLE `habit-checkin-streak-overview` (
`title` tinytext
,`description` text
,`type` enum('pro','anti')
,`rule` time
,`firstCheckin` bigint(20) unsigned
,`lastCheckin` bigint(20) unsigned
,`date` timestamp
,`impact` enum('positive','negative')
);

-- --------------------------------------------------------

--
-- Table structure for table `Streak`
--

CREATE TABLE `Streak` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `Habit` bigint(20) UNSIGNED NOT NULL,
  `firstCheckin` bigint(20) UNSIGNED NOT NULL,
  `lastCheckin` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Streak`
--

INSERT INTO `Streak` (`ID`, `Habit`, `firstCheckin`, `lastCheckin`) VALUES
(4, 5, 2, 2),
(5, 6, 3, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Checkin`
--
ALTER TABLE `Checkin`
  ADD PRIMARY KEY (`ID`,`Habit`) USING BTREE,
  ADD KEY `Streak` (`Streak`),
  ADD KEY `Habit` (`Habit`) USING BTREE;

--
-- Indexes for table `Habit`
--
ALTER TABLE `Habit`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `lastStreak` (`lastStreak`);

--
-- Indexes for table `Streak`
--
ALTER TABLE `Streak`
  ADD PRIMARY KEY (`ID`,`Habit`) USING BTREE,
  ADD KEY `Streak-Habit` (`Habit`),
  ADD KEY `firstCheckin` (`firstCheckin`),
  ADD KEY `lastCheckin` (`lastCheckin`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Checkin`
--
ALTER TABLE `Checkin`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Habit`
--
ALTER TABLE `Habit`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Streak`
--
ALTER TABLE `Streak`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- --------------------------------------------------------

--
-- Structure for view `habit-checkin-streak-overview`
--
DROP TABLE IF EXISTS `habit-checkin-streak-overview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `habit-checkin-streak-overview`  AS SELECT `Habit`.`title` AS `title`, `Habit`.`description` AS `description`, `Habit`.`type` AS `type`, `Habit`.`rule` AS `rule`, `Streak`.`firstCheckin` AS `firstCheckin`, `Streak`.`lastCheckin` AS `lastCheckin`, `Checkin`.`date` AS `date`, `Checkin`.`impact` AS `impact` FROM ((`Streak` left join `Habit` on(`Habit`.`lastStreak` = `Streak`.`ID`)) left join `Checkin` on(`Streak`.`lastCheckin` = `Checkin`.`ID`)) ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Checkin`
--
ALTER TABLE `Checkin`
  ADD CONSTRAINT `Checkin-Habit` FOREIGN KEY (`Habit`) REFERENCES `Habit` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `Streak` FOREIGN KEY (`Streak`) REFERENCES `Streak` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `Habit`
--
ALTER TABLE `Habit`
  ADD CONSTRAINT `lastStreak` FOREIGN KEY (`lastStreak`) REFERENCES `Streak` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `Streak`
--
ALTER TABLE `Streak`
  ADD CONSTRAINT `Streak-Habit` FOREIGN KEY (`Habit`) REFERENCES `Habit` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `firstCheckin` FOREIGN KEY (`firstCheckin`) REFERENCES `Checkin` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `lastCheckin` FOREIGN KEY (`lastCheckin`) REFERENCES `Checkin` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
