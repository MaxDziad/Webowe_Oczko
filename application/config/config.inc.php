<?php

    require ROOT . "\application\composer\\vendor\autoload.php";

    use Twig\Environment;
    use Twig\Loader\FilesystemLoader;

    $config_path = ROOT . "\application\config\\";
    $html_path = ROOT . "\application\html_templates\\";
    $images = ROOT . "\application\images\\";
    $php_path = ROOT . "\application\php_templates\\";
    $stylesheets = "/application/stylesheets/";

    $loader = new FilesystemLoader($html_path);
    $twig = new Environment($loader);
    