<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $all_skins = array();

    $stmt = $dbh->prepare('SELECT * FROM shop WHERE sid IN (SELECT sid FROM shop EXCEPT SELECT sid FROM skins WHERE login = :login)');
    $stmt->execute([':login' => $_SESSION['login']]);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $sid = $row['sid'];
        $name = html_entity_decode($row['name'], ENT_QUOTES | ENT_HTML401);
        $path = html_entity_decode($row['path'], ENT_QUOTES | ENT_HTML401);
        $price = $row['price'];

        $skin = array(
            'sid' => $sid,
            'name' => $name,
            'path' => $path,
            'price' => $price
        );

        array_push($all_skins, $skin);
    }

    if(isset($_GET['buy'])){
        $stmt = $dbh->prepare('SELECT * FROM users WHERE login = :login');
        $stmt->execute([':login' => $_SESSION['login']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt = $dbh->prepare('SELECT * FROM shop WHERE sid = :sid');
        $stmt->execute([':sid' => $_GET['buy']]);
        $skin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $skin) {
            $login = $user['login'];
            $money = $user['money'];
            $sid = $skin['sid'];
            $price = $skin['price'];
            if($money >= $price){
                try {
                    $stmt = $dbh->prepare('INSERT INTO skins (login, sid) VALUES (:login, :sid)');
                    $stmt->execute([':login' => $login, ':sid' => $sid]);
                    $stmt = $dbh->prepare('UPDATE users SET money = money - :price WHERE login = :login');
                    $stmt->execute([':price' => $price, ':login' => $login]);
                    header('Location: /skins');
                } catch (PDOException $e) {}
            }
        }
    }

echo $twig->render('shop.html.twig', ['all_skins' => $all_skins]);