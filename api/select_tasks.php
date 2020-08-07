<?php 
    include('database/db.php');

    $sql = 'SELECT * FROM task';
    $json = array();

    if ($result = $conn -> query($sql)) {
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $json[] = $row;
        }
    } else {
        $json[] = array("result" => null);
    }
    echo json_encode(array("result" => $json));
?>