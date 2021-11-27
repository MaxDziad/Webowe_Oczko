<?php

    require ROOT . "\application\composer\\vendor\autoload.php";

    use Twig\Environment;
    use Twig\Loader\FilesystemLoader;

    $config_path = ROOT . "\application\config\\";
    $images = ROOT . "\application\images\\";
    $php_path = ROOT . "\application\php_templates\\";

    $loader = new FilesystemLoader(ROOT . "\application\html_templates\\");
    $twig = new Environment($loader);
    