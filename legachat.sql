-- projet   : LegaChat
-- version  : 0.1-a
-- date     : 5/07/2019
-- file     : legachat.sql
-- author   : Anarchy


-- Bade de Données : "LegaChat"

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


-- Structure de la table "msg"

CREATE TABLE `msg` (
  `idMsg` int(64) NOT NULL COMMENT '[int]',
  `idOwner` int(3) NOT NULL COMMENT '[int]',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '[timestamp]',
  `content` varchar(512) COLLATE utf8_unicode_ci NOT NULL COMMENT '[rot13(char)]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- Structure de la table "usr"

CREATE TABLE `usr` (
  `idUsr` int(3) NOT NULL COMMENT '[int]',
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '[char]',
  `pass` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '[rot13(sha256(char))]',
	`address` varchar(40) COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '[char]',
	`lastConnect` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '[timestamp]',
	`isAdmin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '[bool(0, 1)]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- Déchargement des données de la table `usr`

INSERT INTO `usr` (`idUsr`, `name`, `pass`, `address`, `lastConnect`, `isAdmin`) VALUES
	(1, 'admin', '8p6976r5o5410415oqr908oq4qrr15qso167n9p873sp4oo8n81s6s2no448n918', NULL, '0000-00-00 00:00:00', 1);


-- Modifications pour les tables déchargées

ALTER TABLE `msg`
  ADD PRIMARY KEY (`idMsg`),
	MODIFY `idMsg` int(64) NOT NULL AUTO_INCREMENT COMMENT '[int]';

ALTER TABLE `usr`
  ADD PRIMARY KEY (`idUsr`),
  ADD UNIQUE KEY `username` (`name`),
	MODIFY `idUsr` int(3) NOT NULL AUTO_INCREMENT COMMENT '[int]',
	AUTO_INCREMENT=2;
COMMIT;

-- END
