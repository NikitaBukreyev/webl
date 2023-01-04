<?php
include "config.php";
$mysqli = new mysqli($data[0], $data[1], $data[2], $data[3]);

if ($mysqli -> connect_errno) {
	echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
	exit();
}
$mysqli -> query("DELETE FROM config");

$text = "";
foreach ($_POST as $key => $value) {
	$tmp = explode("_", $key);
	$text .= $tmp[0] . " ". $tmp[1]. " " . $value . "\n";
	$text .= "INSERT INTO config (carousel_id, slide_id, slide_text) VALUES ($tmp[0], $tmp[1], '$value')\n";
	
	$mysqli -> query("INSERT INTO config (carousel_id, slide_id, slide_text) VALUES ($tmp[0], $tmp[1], '$value')");
}

$file = fopen("log.txt", "w");
fwrite($file, $text);

$mysqli -> close();
fclose($file);
?>