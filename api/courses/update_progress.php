<?php
// api/courses/update_progress.php
require_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id) && !empty($data->course_id)) {
    try {
        // TRUCO SQL: Usamos LEAST() para sumar 10, pero asegurando que nunca sobrepase el 100.
        $query = "UPDATE enrollments SET progress = LEAST(progress + 10, 100) WHERE user_id = :user_id AND course_id = :course_id";
        $stmt = $pdo->prepare($query);
        
        $stmt->bindParam(':user_id', $data->user_id);
        $stmt->bindParam(':course_id', $data->course_id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                "status" => "success", 
                "message" => "Progreso actualizado exitosamente (+10%)."
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error", 
                "message" => "MySQL no pudo guardar el progreso."
            ]);
        }
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error", 
            "message" => "Error interno del servidor de base de datos."
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "error", 
        "message" => "Datos incompletos para actualizar el progreso."
    ]);
}
?>