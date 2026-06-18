<?php
// api/courses/my_courses.php
require_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id)) {
    try {
        // Hacemos un JOIN para obtener los datos del curso basados en la matrícula del usuario
        $query = "SELECT c.*, e.progress FROM courses c 
                  INNER JOIN enrollments e ON c.id = e.course_id 
                  WHERE e.user_id = :user_id";
                  
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':user_id', $data->user_id);
        $stmt->execute();
        
        $my_courses = $stmt->fetchAll();

        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "data" => $my_courses
        ]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Error al obtener tus cursos."
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "ID de usuario no proporcionado."
    ]);
}
?>