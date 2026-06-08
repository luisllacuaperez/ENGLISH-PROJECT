<?php
// api/courses/enroll.php
require_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

// Validar que tengamos ambos IDs
if (!empty($data->user_id) && !empty($data->course_id)) {
    try {
        $query = "INSERT INTO enrollments (user_id, course_id) VALUES (:user_id, :course_id)";
        $stmt = $pdo->prepare($query);
        
        $stmt->bindParam(':user_id', $data->user_id);
        $stmt->bindParam(':course_id', $data->course_id);

        if ($stmt->execute()) {
            http_response_code(201); // Creado
            echo json_encode([
                "status" => "success", 
                "message" => "¡Te has matriculado con éxito!"
            ]);
        }
    } catch (\PDOException $e) {
        http_response_code(400);
        
        // Error 23000: Violación de la restricción UNIQUE (ya está matriculado)
        if ($e->getCode() == 23000) {
            echo json_encode([
                "status" => "error", 
                "message" => "Ya te encuentras matriculado en este curso."
            ]);
        } else {
            echo json_encode([
                "status" => "error", 
                "message" => "Error interno al procesar la matrícula."
            ]);
        }
    }
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "error", 
        "message" => "Datos incompletos. Se requiere usuario y curso."
    ]);
}
?>