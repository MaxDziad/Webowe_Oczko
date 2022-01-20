<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

echo $twig->render('changePassword.html.twig', [ 'username' => $_SESSION['login']]);