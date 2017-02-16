<?php
$db_name="spotnwalk_db";
$mysql_user_name="spotnwalk";
$mysql_password="lachattealucie";
$server_name = "mysql2.paris1.alwaysdata.com";

$conn = mysqli_connect($server_name,$mysql_user_name,$mysql_password,$db_name) or die("Marche pas");

?>