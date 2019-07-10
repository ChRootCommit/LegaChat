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
  `content` varchar(512) COLLATE utf8_unicode_ci NOT NULL COMMENT '[char]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- Structure de la table "usr"

CREATE TABLE `usr` (
  `id` int(3) NOT NULL COMMENT '[int]',
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '[char]',
  `pass` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '[md5(char)]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- Index pour les tables déchargées

ALTER TABLE `msg`
  ADD PRIMARY KEY (`idMsg`);

ALTER TABLE `usr`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`name`);


-- Auto Incrémentation pour les tables déchargées

ALTER TABLE `msg`
  MODIFY `idMsg` int(64) NOT NULL AUTO_INCREMENT COMMENT '[int]';

ALTER TABLE `usr`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT COMMENT '[int]';
COMMIT;
