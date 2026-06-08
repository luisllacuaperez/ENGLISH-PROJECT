<?php
// api/courses/leave.php
require_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id) && !empty($data->course_id)) {
    try {
        $query = "DELETE FROM enrollments WHERE user_id = :user_id AND course_id = :course_id";
        $stmt = $pdo->prepare($query);
        
        $stmt->bindParam(':user_id', $data->user_id);
        $stmt->bindParam(':course_id', $data->course_id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                "status" => "success", 
                "message" => "Te has desmatriculado del curso correctamente."
            ]);
        }
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error", 
            "message" => "Error interno al intentar salir del curso."
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "error", 
        "message" => "Datos incompletos para procesar la solicitud."
    ]);
}
?>