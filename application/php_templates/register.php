<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if (isset($_POST['new_login']) && isset($_POST['new_password']) && isset($_POST['confirm_password'])) {
    $new_login = $_POST['new_login'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];
    if ($new_login !== '' && $new_password !== '' && $confirm_password !== '') {
        if (strlen($new_password) >= 6) {
            if (strcmp($new_password, $confirm_password) == 0) {
                $new_password = password_hash($new_password, PASSWORD_DEFAULT);
                try {
                    $stmt = $dbh->prepare('INSERT INTO users (uid, login, password, created) VALUES (null, :login, :password, NOW())');
                    $stmt->execute([':login' => $new_login, ':password' => $new_password]);
                    $stmt = $dbh->prepare('INSERT INTO statistics (username) VALUES (:username)');
                    $stmt->execute([':username' => $new_login]);
                    $_SESSION['login'] = $new_login;
                    header('Location: /');
                } catch (PDOException $e) {
                    echo '<script type="text/javascript">alert("Taki użytkownik już jest w naszej bazie!");</script>';
                }
            } else echo '<script type="text/javascript">alert("Podane hasła różnią się!");</script>';
        } else echo '<script type="text/javascript">alert("Hasło musi mieć co najmniej 6 znaków!");</script>';
    } else echo '<script type="text/javascript">alert("Pola nie mogą być puste!");</script>';
}
echo $twig->render('register.html.twig');

