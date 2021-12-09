<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if (isset($_POST['login']) && isset($_POST['password'])) {
    $login = $_POST['login'];
    $password = $_POST['password'];
    if($login !== '' && $password !== '') {
        $stmt = $dbh->prepare("SELECT login, password FROM users WHERE login = :login");
        $stmt->execute([':login' => $login]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['login'] = $login;
                header('Location: /');
            } else echo '<script type="text/javascript">alert("Podane hasło jest nieprawidłowe!");</script>';
        } else echo '<script type="text/javascript">alert("Nie ma takiego użytkownika!");</script>';
    } else echo '<script type="text/javascript">alert("Pola nie mogą być puste!");</script>';
}

echo $twig->render('login.html.twig');