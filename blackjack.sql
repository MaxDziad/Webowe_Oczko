-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 08 Gru 2021, 16:53
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
('admin', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `uid` int(10) UNSIGNED NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `money` int(10) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`uid`, `login`, `password`, `money`, `created`) VALUES
(1, 'admin', '$2y$10$GEO80edBKrYoDIEXiY0W3eT2w.aGZceklHYBHzcB/wu8K/0THSFR6', 30, '2021-11-29 21:00:27');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `skins`
--
ALTER TABLE `skins`
  ADD UNIQUE KEY `skin` (`login`,`sid`) USING HASH;

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
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
