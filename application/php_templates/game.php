<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if(isset($_POST['player2Type'])){
    if ($_POST['player2Type'] == 0){ //player type odpowiadający user
        $hostname = $_SESSION['login'];
        $username = $_POST['player2Name'];
        if ($username == '') echo '<script type="text/javascript">alert("Username cannot be empty!"); window.location = "/lobby"</script>';
        if ($username == $hostname ) echo '<script type="text/javascript">alert("Username cannot be the same as hostname!"); window.location = "/lobby"</script>';
        $stmt = $dbh->prepare('SELECT login FROM users'); $stmt->execute();
        $registered_users = array();
        while ($users = $stmt->fetch(PDO::FETCH_ASSOC)) array_push($registered_users, $users['login']);
        if (in_array($hostname, $registered_users)) echo '<script type="text/javascript">alert("Username is not in our database!"); window.location = "/lobby"</script>';
    }
} else echo '<script type="text/javascript">alert("You may go to game only by lobby!"); window.location = "/"</script>';

echo $twig->render('game.html.twig');