<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $shop_skins = array();

    $stmt = $dbh->prepare('SELECT * FROM shop WHERE sid IN (SELECT sid FROM shop EXCEPT SELECT sid FROM skins WHERE username = :username)');
    $stmt->execute([':username' => $_SESSION['login']]);

    while ($skin = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $sid = intval($skin['sid']);
        $name = $skin['name'];
        $path = $skin['path'];
        $price = $skin['price'];

        $new_skin = array(
            'sid' => $sid,
            'name' => $name,
            'path' => $path,
            'price' => $price
        );

        array_push($shop_skins, $new_skin);
    }

    if(isset($_POST['buy'])){
        $stmt = $dbh->prepare('SELECT * FROM statistics WHERE username = :username');
        $stmt->execute([':username' => $_SESSION['login']]);
        $statistic = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt = $dbh->prepare('SELECT * FROM shop WHERE sid = :sid');
        $stmt->execute([':sid' => $_POST['buy']]);
        $skin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($statistic && $skin) {
            if($statistic['money'] >= $skin['price']){
                try {
                    $stmt = $dbh->prepare('INSERT INTO skins (username, sid) VALUES (:username, :sid)');
                    $stmt->execute([':username' => $statistic['username'], ':sid' => $skin['sid']]);
                    $stmt = $dbh->prepare('UPDATE statistics SET money = money - :price WHERE username = :username');
                    $stmt->execute([':price' => $skin['price'], ':username' => $statistic['username']]);
                    header('Location: /skins');
                } catch (PDOException $e) {}
            }
        }
    }

echo $twig->render('shop.html.twig', ['shop_skins' => $shop_skins]);