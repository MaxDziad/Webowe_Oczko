<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

    $user_skins = array();

    $stmt = $dbh->prepare('SELECT * FROM shop JOIN skins USING (sid) WHERE username = :username');
    $stmt->execute([':username' => $_SESSION['login']]);

    while ($skin = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $name = html_entity_decode($skin['name'], ENT_QUOTES | ENT_HTML401);
        $path = html_entity_decode($skin['path'], ENT_QUOTES | ENT_HTML401);

        $new_skin = array(
            'name' => $name,
            'path' => $path,
        );

        array_push($user_skins, $new_skin);
    }


echo $twig->render('skins.html.twig',  ['user_skins' => $user_skins]);
