-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 07 Sty 2022, 19:01
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `blackjack`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `achievements`
--

CREATE TABLE `achievements` (
  `name` text NOT NULL,
  `criterion` text NOT NULL,
  `threshold` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `achievements`
--

INSERT INTO `achievements` (`name`, `criterion`, `threshold`) VALUES
('First Win', 'wins', 1),
('Newbie', 'wins', 5),
('Amateur', 'wins', 10),
('Professional', 'wins', 20),
('Expert', 'wins', 30),
('Risky', 'drawnCards', 10),
('Venturesome', 'drawnCards', 20),
('Audacious', 'drawnCards', 30),
('Crazy Mad!', 'drawnCards', 40),
('Tight!', 'blackjacks', 1),
('Nah, it wasn\'t tight', 'blackjacks', 5),
('Perfection.', 'blackjacks', 10),
('Persian Eye!', 'snakeEyes', 1),
('Two Eyes', 'snakeEyes', 2),
('Inner Eye', 'snakeEyes', 3),
('Are you a spider?', 'snakeEyes', 8),
('One Hundred', 'gamePoints', 100),
('Two Hundred', 'gamePoints', 200),
('Five Hundred!', 'gamePoints', 500),
('That\'s a One Thousand!', 'gamePoints', 1000),
('It\'s an Addiction...', 'gamePoints', 1000000),
('A Stairs to Climb', 'rankingPoints', 10),
('I\'ll Take the Elevator', 'rankingPoints', 50),
('Challenger Approaches!', 'rankingPoints', 100),
('Pocket Money', 'revenue', 50),
('Not Poor Anymore', 'revenue', 150),
('I Can Sleep On It', 'revenue', 500),
('Is it Necessary?', 'revenue', 1000),
('Let\'s Buy a Lamborghini!', 'revenue', 10000);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shop`
--

CREATE TABLE `shop` (
  `sid` int(10) NOT NULL,
  `name` text NOT NULL,
  `path` text NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `shop`
--

INSERT INTO `shop` (`sid`, `name`, `path`, `price`) VALUES
(1, 'Basic Green', '/application/images/skins/green.png', 20),
(2, 'Basic Red', '/application/images/skins/red.png', 10),
(3, 'Basic Blue', '/application/images/skins/blue.png', 50),
(4, 'Golden', '/application/images/skins/gold.png', 200),
(5, 'Silver', '/application/images/skins/silver.png', 150),
(6, 'Blue with Springs', '/application/images/skins/blue_springs.png', 120),
(7, 'Golden Pixelized', '/application/images/skins/golden_pixelized.png', 300),
(8, 'Golden Spear', '/application/images/skins/golden_spear.png', 350),
(9, 'Hearthstone', '/application/images/skins/hearthstone.png', 230),
(10, 'Magic The Gathering', '/application/images/skins/magic.png', 180),
(11, 'Pink Poker', '/application/images/skins/pink_poker.png', 140),
(12, 'Pokemon', '/application/images/skins/pokemon.jpg', 500);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skins`
--

CREATE TABLE `skins` (
  `username` text NOT NULL,
  `sid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `skins`
--

INSERT INTO `skins` (`username`, `sid`) VALUES
('admin', 3),
('admin', 2),
('user', 2),
('admin', 1),
('admin', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `statistics`
--

CREATE TABLE `statistics` (
  `username` text NOT NULL,
  `wins` int(10) NOT NULL DEFAULT 0,
  `failures` int(10) NOT NULL DEFAULT 0,
  `drawnCards` int(10) NOT NULL DEFAULT 0,
  `blackjacks` int(10) NOT NULL DEFAULT 0,
  `snakeEyes` int(10) NOT NULL DEFAULT 0,
  `gamePoints` int(10) NOT NULL DEFAULT 0,
  `rankingPoints` int(10) NOT NULL DEFAULT 0,
  `revenue` int(10) NOT NULL DEFAULT 50,
  `money` int(10) NOT NULL DEFAULT 50,
  `currentSkin` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `statistics`
--

INSERT INTO `statistics` (`username`, `wins`, `failures`, `drawnCards`, `blackjacks`, `snakeEyes`, `gamePoints`, `rankingPoints`, `revenue`, `money`, `currentSkin`) VALUES
('admin', 10, 14, 100, 0, 0, 532, 6, 100, 100, 2),
('user', 0, 9, 18, 0, 0, 171, -9, 0, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `uid` int(10) UNSIGNED NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`uid`, `login`, `password`, `created`) VALUES
(1, 'admin', '$2y$10$GEO80edBKrYoDIEXiY0W3eT2w.aGZceklHYBHzcB/wu8K/0THSFR6', '2021-11-29 21:00:27'),
(3, 'user', '$2y$10$vzceub0338DC430E26RDqu4ldD0i1PKN1kaCnhAYawAW9l6aYvSdS', '2021-12-14 01:10:51');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `achievements`
--
ALTER TABLE `achievements`
  ADD UNIQUE KEY `name` (`name`) USING HASH;

--
-- Indeksy dla tabeli `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`sid`);

--
-- Indeksy dla tabeli `skins`
--
ALTER TABLE `skins`
  ADD UNIQUE KEY `skin` (`username`,`sid`) USING HASH;

--
-- Indeksy dla tabeli `statistics`
--
ALTER TABLE `statistics`
  ADD UNIQUE KEY `username` (`username`) USING HASH;

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `login` (`login`) USING HASH;

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
