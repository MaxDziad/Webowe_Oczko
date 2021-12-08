<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $my_skins = array();

    $stmt = $dbh->prepare('SELECT * FROM skins, shop WHERE login = :login AND id = id_skin');
    $stmt->execute([':login' => $_SESSION['login']]);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $name = html_entity_decode($row['name'], ENT_QUOTES | ENT_HTML401);
        $path = html_entity_decode($row['path'], ENT_QUOTES | ENT_HTML401);

        $skin = array(
            'name' => $name,
            'path' => $path,
        );

        array_push($my_skins, $skin);
    }


echo $twig->render('skins.html.twig',  ['my_skins' => $my_skins]);
