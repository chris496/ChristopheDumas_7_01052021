-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 25 juin 2021 à 13:53
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user` int NOT NULL,
  `post` int NOT NULL,
  `added_date` datetime DEFAULT NULL,
  `modif_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_comment` (`user`),
  KEY `fk_post_id_comment` (`post`)
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `description`, `user`, `post`, `added_date`, `modif_date`) VALUES
(378, 'magnifique', 88, 322, '2021-06-25 15:45:38', NULL),
(380, 'bon courage !!!', 105, 323, '2021-06-25 15:46:14', NULL),
(381, 'belle initiative', 105, 321, '2021-06-25 15:46:32', NULL),
(382, 'merci', 88, 323, '2021-06-25 15:47:17', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `like`
--

DROP TABLE IF EXISTS `like`;
CREATE TABLE IF NOT EXISTS `like` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `post` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_like` (`user`),
  KEY `fk_post_id_like` (`post`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `like`
--

INSERT INTO `like` (`id`, `user`, `post`) VALUES
(164, 88, 322),
(165, 88, 323),
(166, 105, 323);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `picture` varchar(250) DEFAULT NULL,
  `added_date` datetime DEFAULT NULL,
  `modif_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `user`, `title`, `description`, `picture`, `added_date`, `modif_date`) VALUES
(321, 88, 'premier post', 'voici le premier post du site', '', '2021-06-25 15:43:57', NULL),
(322, 105, 'belle photo', '', 'http://localhost:3000/images/nature_(1).jpg1624628683284.jpg', '2021-06-25 15:44:43', NULL),
(323, 88, '', 'moi au travail', 'http://localhost:3000/images/tech.jpg1624628713767.jpg', '2021-06-25 15:45:14', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `photo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `added_date` datetime DEFAULT NULL,
  `modif_date` datetime DEFAULT NULL,
  `isadmin` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `photo`, `added_date`, `modif_date`, `isadmin`) VALUES
(88, 'Christophe', 'Dumas', 'chris@mail.fr', '$2b$10$ugrmpKrDwj.Xoko601ZjjegicObOX5dvmXdmrUBu8.DsGnBnSXRBq', 'http://localhost:3000/images/user3.jpg1624395151076.jpg', NULL, NULL, 0),
(105, 'Jean', 'Dubois', 'dubois.jean@mail.fr', '$2b$10$GgptkknaXQNbafddZMkY1.qhGlUmINiCTt88J5dMyCIW3CDcfEqBq', 'http://localhost:3000/images/user2.jpg1624628661139.jpg', NULL, NULL, 0),
(107, 'admin', 'admin', 'admin@mail.fr', '$2b$10$DBtQgJR7L9dACvGcuMT2Bu5CMUaCYvc7bAAbxEOL7flJWJqQX8csK', NULL, NULL, NULL, 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_post_id_comment` FOREIGN KEY (`post`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_id_comment` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `fk_post_id_like` FOREIGN KEY (`post`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_user_id_like` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
