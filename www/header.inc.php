<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bike Store</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <?php 
        if(isset($page)){ 
            echo "<link href=\"www/style/$page.css\" rel=\"stylesheet\">" ;
        }
        ?>
        <link href="www/style/main.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
        <script src="www/js/utilities.js"></script>
        <script src="www/js/nav.js"></script>
        <?php 
        if(isset($page)){ 
            if ($page=="home") {
                echo "
                <link rel=\"stylesheet\" href=\"https://unpkg.com/leaflet/dist/leaflet.css\" />
                <script src=\"https://unpkg.com/leaflet/dist/leaflet.js\"></script>
                ";
            }
        }
        ?>
        <?php 
        if(isset($page)){ 
            echo "<script src=\"www/js/$page.js\"></script>" ;
        }
        ?>
    </head>
    <body>