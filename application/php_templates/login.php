<?php

$message = '';

if (isset($_POST['login']) && isset($_POST['password'])) {

    if ($_POST['login'] == '' || $_POST['password'] == '') {
        $message = "Pola nie mogą być puste.";
    }
    else {
        $stmt = $dbh->prepare("SELECT * FROM users WHERE login = :login");
        $stmt->execute([':login' => $_POST['login']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // if (password_verify($_POST['password'], $user['password'])) {
            if ($_POST['password'] == $user['password']) {
                // $_SESSION['id'] = $user['id'];
                $_SESSION['login'] = $user['login'];
                $message = "Zalogowano pomyślnie.";
                // header('Location: /');
            } else $message = "Hasło niepoprawne.";
        } else $message = "Nie ma takiego użytkownika.";
    }
}

echo $twig->render('login.html.twig', ['message'=>$message]);