<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if(isset($_COOKIE['gameData'])){
    $cookie = $_COOKIE['gameData'];
    $playersData = explode("&", $cookie);
    unset($playersData[0]);
    foreach ($playersData as $playerData){
        $data = explode(",", $playerData);
        $username = $data[0];
        $isWinner = $data[1];
        $hadSnakeEyes = $data[2];
        $pointsObtained = $data[3];
        $drawnCards = $data[4];
        // TERAZ GUNIA TUTAJ AKTUALIZUJESZ BAZĘ DANYCH! Wszystkie zmienne są w postaci stringów! isWinner i hadSnakeEyes są jako true/false!
        // Nie musisz sprawdzać czy taki gracz istnieje (można dla pewności), bo ciasteczko zapisuje tylko zalogowanych graczy
    }
}

echo $twig->render('profile.html.twig');