<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if(isset($_COOKIE['gameData'])){
    $cookie = $_COOKIE['gameData'];
    $playersData = explode("&", $cookie);
    unset($playersData[0]);
    foreach ($playersData as $playerData){
        $data = explode(",", $playerData);
        $username = $data[0];
        $win = intval(filter_var($data[1], FILTER_VALIDATE_BOOLEAN));
        $snakeEye = intval(filter_var($data[2], FILTER_VALIDATE_BOOLEAN));
        $gamePoints = intval($data[3]);
        $drawnCards = intval($data[4]);
        $additionalBetPoints = intval($data[5]);

        $blackjack = 0;
        if($gamePoints == 21) $blackjack = 1;

        $rankingPoints = 0;
        if($win == 1) $rankingPoints = 2;
        if($win == 0) $rankingPoints = -1;
        if($blackjack == 1) $rankingPoints = 5;
        if($snakeEye == 1) $rankingPoints = 10;

        $money = 0;
        if ($rankingPoints > 0) $money = $rankingPoints * 5;

        $stmt = $dbh->prepare('UPDATE statistics SET wins = wins + :win, failures = failures + (1 - :win),
                      drawnCards = drawnCards + :drawnCards, blackjacks = blackjacks + :blackjack,
                      snakeEyes = snakeEyes + :snakeEye, gamePoints = gamePoints + :gamePoints,
                      rankingPoints = rankingPoints + :rankingPoints, revenue = revenue + :money,
                      money = money + :money WHERE username = :username');
        $stmt->execute([':win' => $win, ':drawnCards' => $drawnCards, ':blackjack' => $blackjack,
                        ':snakeEye' => $snakeEye, ':gamePoints' => $gamePoints,
                        ':rankingPoints' => $rankingPoints, ':money' => $money, ':username' => $username]);
    }

    setcookie("gameData", "", time() - 3600); // setting cookie time to current time minus one hour to make it expire
}



echo $twig->render('profile.html.twig', ['username' => $_SESSION['login'], 'cash' => $_SESSION['cash']]);