<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $user_skins = array();

    $stmt = $dbh->prepare('SELECT * FROM shop JOIN skins USING (sid) WHERE login = :login');
    $stmt->execute([':login' => $_SESSION['login']]);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $name = html_entity_decode($row['name'], ENT_QUOTES | ENT_HTML401);
        $path = html_entity_decode($row['path'], ENT_QUOTES | ENT_HTML401);

        $skin = array(
            'name' => $name,
            'path' => $path,
        );

        array_push($user_skins, $skin);
    }


echo $twig->render('skins.html.twig',  ['user_skins' => $user_skins]);
