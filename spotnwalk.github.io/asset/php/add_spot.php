<?php
	require "connexion.php";
	$nom_spot = $_POST["nom_spot"];
	$categorie = $_POST["categorie"];
	$description = $_POST["description"];
	$latitude_deg = $_POST["latitude_deg"];
	$latitude_min = $_POST["latitude_min"];
	$latitude_sec = $_POST["latitude_sec"];
	$longitude_deg = $_POST["longitude_deg"];
	$longitude_min = $_POST["longitude_min"];
	$longitude_sec = $_POST["longitude_sec"];
	$mysql_qry = "insert into spots (nom, categorie, description, latitude_deg, latitude_min, latitude_sec,
					longitude_deg, longitude_min, longitude_sec) values ('$nom_spot','$categorie', '$description', 
					'$latitude_deg', '$latitude_min', '$latitude_sec', '$longitude_deg', '$longitude_min', '$longitude_sec')";
	if($conn->query($mysql_qry) === TRUE)
	{
		echo "ok";
	}
	else
	{
		echo "not ok";
	}
	$conn->close();
?>