<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $best_users = array();
    $hostname = $_SESSION['login'];

    $stmt = $dbh->prepare('SELECT * FROM statistics ORDER BY rankingPoints DESC LIMIT 5');
    $stmt->execute();

    while ($stats = $stmt->fetch(PDO::FETCH_ASSOC)){
        $username = $stats['username'];
        $wins = $stats['wins'];
        $failures = $stats['failures'];
        $games = $wins + $failures;
        if ($games > 0) $efficiency = round($wins / $games * 100) . '%';
        else $efficiency = '0%';

        $user = array(
            'username'=> $username,
            'wins' => $wins,
            'failures' => $failures,
            'games' => $games,
            'efficiency' => $efficiency,
        );
        array_push($best_users, $user);
    }


echo $twig->render('statistics.html.twig', ['best_users' => $best_users]);