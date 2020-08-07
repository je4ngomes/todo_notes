<?php 
    include('database/db.php');

    $_POST = json_decode(file_get_contents('php://input'), true);
    $title = $_POST['title'];
    $description = $_POST['description'];
    $image_url = $_POST['image_url'];

    if (!$title && !$description && !$image_url) {
        echo json_encode(array("result" => false));
    } else {
        $sql = "INSERT INTO task VALUES(DEFAULT, '$title', '$description', '$image_url', now());";

        if ($conn -> query($sql)) {
            echo json_encode(array("result" => true));
        } else {
            echo json_encode(array("result" => false, "error"=> $conn->error));
        }
    }

?>