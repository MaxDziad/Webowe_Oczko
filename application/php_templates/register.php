<?php

$message = '';

if (isset($_POST['new_login'])&& isset($_POST['new_password']) && isset($_POST['confirm_password'])) {
    $new_login = $_POST['new_login'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];

    if ($new_login == '' || $new_password == '' || $confirm_password == '') {
        $message = "Pola nie mogą być puste.";
    } else {
        if (strlen($new_password) < 6) {
            $message = "Hasło musi mieć co najmniej 6 znaków.";
        } else {
            if (strcmp($new_password, $confirm_password) !== 0) {
                $message = "Podane hasła różnią się.";
            } else {
                $new_password = password_hash($new_password, PASSWORD_DEFAULT);
                try {
                    $stmt = $dbh->prepare('INSERT INTO users (id, login, password, created) VALUES (null, :login, :password, NOW())');
                    $stmt->execute([':login' => $new_login, ':password' => $new_password]);
                    $message = "Konto zostało zarejestrowane.";
                } catch (PDOException $e) {
                    $message = "Podany login jest już zajęty.";
                }
            }
        }
    }
}

echo $twig->render('register.html.twig', ['message' => $message]);

