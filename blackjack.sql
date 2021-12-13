-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 13 Gru 2021, 21:28
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
  `description` text NOT NULL,
  `criterion` text NOT NULL,
  `threshold` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `achievements`
--

INSERT INTO `achievements` (`name`, `description`, `criterion`, `threshold`) VALUES
('5 wins', 'You have to win minimum 5 games.', 'wins', 5),
('Snake Eyes', 'You have to ...', 'snakeEyes', 3),
('21 points', 'no desc', 'blackjacks', 10);

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
(1, 'green', '/application/images/skins/green.png', 20),
(2, 'red', '/application/images/skins/red.png', 10),
(3, 'yellow', '/application/images/skins/yellow.png', 15);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skins`
--

CREATE TABLE `skins` (
  `login` text NOT NULL,
  `sid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `skins`
--

INSERT INTO `skins` (`login`, `sid`) VALUES
('admin', 3),
('admin', 2),
('admin', 1),
('user', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `statistics`
--

CREATE TABLE `statistics` (
  `login` text NOT NULL,
  `wins` int(11) NOT NULL,
  `failures` int(11) NOT NULL,
  `blackjacks` int(11) NOT NULL,
  `snakeEyes` int(11) NOT NULL,
  `hardBotWins` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `revenue` int(11) NOT NULL,
  `money` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `statistics`
--

INSERT INTO `statistics` (`login`, `wins`, `failures`, `blackjacks`, `snakeEyes`, `hardBotWins`, `points`, `revenue`, `money`) VALUES
('admin', 7, 1, 0, 2, 3, 150, 200, 750);

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
(2, 'user', '$2y$10$IF/moDXy49e23s/eAtlN3uYs1Aw9tAh/y4og9Z7ESD4s4sFg36fQS', '2021-12-09 20:59:58');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `skins`
--
ALTER TABLE `skins`
  ADD UNIQUE KEY `skin` (`login`,`sid`) USING HASH;

--
-- Indeksy dla tabeli `statistics`
--
ALTER TABLE `statistics`
  ADD UNIQUE KEY `login` (`login`) USING HASH;

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
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
