<?php 
    
	include('database/db.php');

    $_POST = json_decode(file_get_contents('php://input'), true);
    $title = $_POST['title'];
    $id = $_POST['id'];
    $description = $_POST['description'];
    $image_url = $_POST['image_url'];
    
    $sql = "UPDATE task SET title = '$title', description = '$description', image_url = '$image_url' WHERE id_task = '$id'";

    if ($conn -> query($sql)) {
        echo json_encode(array("result" => true));
    } else {
        echo json_encode(array("result" => false, "error" => $conn->error));
    }
?>