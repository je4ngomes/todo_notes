<?php 
    include('database/db.php');

    $_POST = json_decode(file_get_contents('php://input'), true);
    $id = $_POST['id_task'];

    $sql = "DELETE FROM task WHERE id_task='$id'";
    $json = array();

    if ($result = $conn -> query($sql)) {
        echo json_encode(array("result" => true));
    } else {
        echo json_encode(array("result" => false, error => $conn->error));
    }
?>