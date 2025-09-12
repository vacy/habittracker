-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 10, 2025 at 04:34 PM
-- Server version: 10.11.13-MariaDB
-- PHP Version: 8.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `habittracker`
--
CREATE DATABASE IF NOT EXISTS `habittracker` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `habittracker`;

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
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Habit`
--
ALTER TABLE `Habit`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Streak`
--
ALTER TABLE `Streak`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- --------------------------------------------------------

--
-- Structure for view `habit-checkin-streak-overview`
--
DROP TABLE IF EXISTS `habit-checkin-streak-overview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`user`@`localhost` SQL SECURITY DEFINER VIEW `habit-checkin-streak-overview`  AS SELECT `habittracker`.`Habit`.`title` AS `title`, `habittracker`.`Habit`.`description` AS `description`, `habittracker`.`Habit`.`type` AS `type`, `habittracker`.`Habit`.`rule` AS `rule`, `habittracker`.`Streak`.`firstCheckin` AS `firstCheckin`, `habittracker`.`Streak`.`lastCheckin` AS `lastCheckin`, `habittracker`.`Checkin`.`date` AS `date`, `habittracker`.`Checkin`.`impact` AS `impact` FROM ((`habittracker`.`Streak` left join `habittracker`.`Habit` on(`habittracker`.`Habit`.`lastStreak` = `habittracker`.`Streak`.`ID`)) left join `habittracker`.`Checkin` on(`habittracker`.`Streak`.`lastCheckin` = `habittracker`.`Checkin`.`ID`)) ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Checkin`
--
ALTER TABLE `Checkin`
  ADD CONSTRAINT `Checkin-Habit` FOREIGN KEY (`Habit`) REFERENCES `Habit` (`ID`),
  ADD CONSTRAINT `Streak` FOREIGN KEY (`Streak`) REFERENCES `Streak` (`ID`);

--
-- Constraints for table `Habit`
--
ALTER TABLE `Habit`
  ADD CONSTRAINT `lastStreak` FOREIGN KEY (`lastStreak`) REFERENCES `Streak` (`ID`);

--
-- Constraints for table `Streak`
--
ALTER TABLE `Streak`
  ADD CONSTRAINT `Streak-Habit` FOREIGN KEY (`Habit`) REFERENCES `Habit` (`ID`),
  ADD CONSTRAINT `firstCheckin` FOREIGN KEY (`firstCheckin`) REFERENCES `Checkin` (`ID`),
  ADD CONSTRAINT `lastCheckin` FOREIGN KEY (`lastCheckin`) REFERENCES `Checkin` (`ID`);
COMMIT;
