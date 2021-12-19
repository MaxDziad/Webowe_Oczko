<?php
if (!defined('IN_INDEX')) { exit("Nie można uruchomić tego pliku bezpośrednio."); }

if(isset($_POST['player1Type'])){
    $user_players = array();
    if ($_POST['player2Type'] == 10) array_push($user_players, $_POST['player2Name']);
    if ($_POST['player3Type'] == 10) array_push($user_players, $_POST['player3Name']);
    if ($_POST['player4Type'] == 10) array_push($user_players, $_POST['player4Name']);
    foreach ($user_players as $username) {
        if ($username == '') echo '<script type="text/javascript">alert("Username cannot be empty!"); window.location = "/lobby"</script>';
        if ($username == $_SESSION['login']) echo '<script type="text/javascript">alert("Username cannot be the same as hostname!"); window.location = "/lobby"</script>';
        $counter = 0;
        foreach ($user_players as $username_copy) if($username == $username_copy) $counter++;
        if ($counter > 1) echo '<script type="text/javascript">alert("Usernames has to be unique!"); window.location = "/lobby"</script>';
        $stmt = $dbh->prepare('SELECT login FROM users');
        $stmt->execute();
        $registered_users = array();
        while ($users = $stmt->fetch(PDO::FETCH_ASSOC)) array_push($registered_users, $users['login']);
        if (!in_array($username, $registered_users)) echo '<script type="text/javascript">alert("Username is not in our database!"); window.location = "/lobby"</script>';
    }
} else echo '<script type="text/javascript">alert("You may go to game only by lobby!"); window.location = "/"</script>';

echo $twig->render('game.html.twig');