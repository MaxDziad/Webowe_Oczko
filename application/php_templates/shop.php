<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $all_skins = array();

    $stmt = $dbh->prepare('SELECT * FROM shop WHERE id IN (SELECT id FROM shop EXCEPT SELECT id_skin FROM skins WHERE login = :login)');
    $stmt->execute([':login' => $_SESSION['login']]);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $id = $row['id'];
        $name = html_entity_decode($row['name'], ENT_QUOTES | ENT_HTML401);
        $path = html_entity_decode($row['path'], ENT_QUOTES | ENT_HTML401);
        $price = intval($row['price']);

        $skin = array(
            'id' => $id,
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

        $stmt = $dbh->prepare('SELECT * FROM shop WHERE id = :id');
        $stmt->execute([':id' => $_GET['buy']]);
        $skin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $skin) {
            $login = $user['login'];
            $money =  intval($user['money']);
            $id_skin = $skin['id'];
            $price =  intval($skin['price']);
            if($money >= $price){
                $stmt = $dbh->prepare('UPDATE users SET money = money - :price WHERE login = :login');
                $stmt->execute([':price' => $price, ':login' => $login]);
                $stmt = $dbh->prepare('INSERT INTO skins (id_skin, login) VALUES (:id_skin, :login)');
                $stmt->execute([':id_skin' => $id_skin, ':login' => $login]);
                header('Location: /skins');
            }
        }
    }

echo $twig->render('shop.html.twig', ['all_skins' => $all_skins]);