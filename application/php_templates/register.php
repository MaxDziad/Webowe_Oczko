<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if (isset($_POST['new_login'])&& isset($_POST['new_password']) && isset($_POST['confirm_password']) && $_POST['new_login'] !== '' && strlen($_POST['$new_password']) < 6 && strcmp($_POST['$new_password'], $_POST['$confirm_password']) !== 0) {

    $new_login = $_POST['new_login'];
    $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

    try {
        $stmt = $dbh->prepare('INSERT INTO users (id, login, password, money, created) VALUES (null, :login, :password, 10, NOW())');
        $stmt->execute([':login' => $new_login, ':password' => $new_password]);
        $_SESSION['login'] = $new_login;
        header('Location: /');
    } catch (PDOException $e) {}
}

echo $twig->render('register.html.twig');

