-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: ks.kivitas.de:3306:3306
-- Erstellungszeit: 10. Jan 2023 um 20:15
-- Server-Version: 5.7.40
-- PHP-Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `messe`
--
CREATE DATABASE IF NOT EXISTS `messe` DEFAULT CHARACTER SET latin1 COLLATE latin1_german1_ci;
USE `messe`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `companies`
--

CREATE TABLE `companies` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `customers`
--

CREATE TABLE `customers` (
  `ID` int(11) NOT NULL,
  `Surname` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Firstname` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Email` varchar(1024) COLLATE latin1_german1_ci NOT NULL,
  `Phone` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL,
  `Street` varchar(1024) COLLATE latin1_german1_ci NOT NULL,
  `Housenumber` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `City` varchar(1024) COLLATE latin1_german1_ci NOT NULL,
  `Postcode` int(255) NOT NULL,
  `Picture` longblob NOT NULL,
  `Company` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `interests`
--

CREATE TABLE `interests` (
  `Customer` int(11) NOT NULL,
  `Product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `products`
--

CREATE TABLE `products` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `products`
--

INSERT INTO `products` (`ID`, `Name`) VALUES
(1, 'Abschlusserstellung'),
(2, 'Steuererklärung'),
(3, 'Lohnbuchhaltung'),
(4, 'Steuerliche Planung'),
(5, 'Betriebswirtschaftliche Beratung'),
(6, 'Nachfolgeberatung'),
(7, 'Existenzgründungsberatung');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `company_fk` (`Company`);

--
-- Indizes für die Tabelle `interests`
--
ALTER TABLE `interests`
  ADD PRIMARY KEY (`Customer`,`Product`),
  ADD KEY `product_fk` (`Product`);

--
-- Indizes für die Tabelle `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `companies`
--
ALTER TABLE `companies`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `customers`
--
ALTER TABLE `customers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `company_fk` FOREIGN KEY (`Company`) REFERENCES `companies` (`ID`);

--
-- Constraints der Tabelle `interests`
--
ALTER TABLE `interests`
  ADD CONSTRAINT `customer_fk` FOREIGN KEY (`Customer`) REFERENCES `customers` (`ID`),
  ADD CONSTRAINT `product_fk` FOREIGN KEY (`Product`) REFERENCES `products` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
