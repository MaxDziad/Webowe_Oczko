<?php

if (isset($_POST['login']) && isset($_POST['password']) && $_POST['login'] !== '' && $_POST['password'] !== '') {
    $stmt = $dbh->prepare("SELECT login, password FROM users WHERE login = :login");
    $stmt->execute([':login' => $_POST['login']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($_POST['password'], $user['password'])) {
            $_SESSION['login'] = $user['login'];
            header('Location: /');
        }
    }
}

echo $twig->render('login.html.twig');