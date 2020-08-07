<?php 
    include('database/db.php');

    $id = $_GET['id'];

    $sql = "SELECT * FROM task WHERE id_task = '$id'";
    $json = null;

    if ($result = $conn -> query($sql)) {
        $json = $result->fetch_assoc();
    } else {
        $json = array("result" => null);
    }

    echo json_encode(array("result" => $json));
?>