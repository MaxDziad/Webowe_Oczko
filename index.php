<?php
	define('ROOT', __dir__);

	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	require ROOT . "\application\\vendor\autoload.php";

	include(ROOT . "\application\config\config.inc.php");

	session_start();

	$pages_for_all = ['main', 'game', 'login', 'register', 'profile', 'lobby', 'statistics'];
	$pages_for_logged = [];
	$pages_for_unlogged = [];

	if ((isset($_GET['page']) && $_GET['page'] && in_array($_GET['page'], $pages_for_all)) || (isset($_GET['page']) && $_GET['page'] && in_array($_GET['page'], $pages_for_logged) && isset($_SESSION['id'])) || (isset($_GET['page']) && $_GET['page'] && in_array($_GET['page'], $pages_for_unlogged) && !isset($_SESSION['id']))) 
	{
		if (file_exists($php_path . $_GET['page'] . '.php'))
		{
			include($php_path . $_GET['page'] . '.php');
		}
		else
		{
			print '<p style="font-weight: bold; text-align: center; margin-top: 50px;"> Plik ' . $_GET['page'] . '.php nie istnieje.</p>';
		}
	}
	elseif (isset($_GET['page']) && !isset($_SESSION['id']) && in_array($_GET['page'], $pages_for_logged))
	{
		print '<p style="font-weight: bold; text-align: center; margin-top: 50px;">Musisz być zalogowany, aby mieć dostęp do tej strony.</p>';
	} 
	elseif (isset($_GET['page']) && isset($_SESSION['id']) && in_array($_GET['page'], $pages_for_unlogged))
	{
		print '<p style="font-weight: bold; text-align: center; margin-top: 50px;">Jesteś zalogowany, więc nie masz dostępu do tej strony.</p>';
	} 
	else 
	{
		include($php_path . 'main.php');
	}

	exit;
?>
