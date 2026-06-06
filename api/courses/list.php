<?php
// api/courses/list.php
require_once '../config.php';

try {
    // Preparar y ejecutar la consulta a MySQL
    $query = "SELECT * FROM courses";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    // Obtener todos los resultados
    $courses = $stmt->fetchAll();

    http_response_code(200); // OK
    echo json_encode([
        "status" => "success",
        "data" => $courses
    ]);
} catch (\PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode([
        "status" => "error",
        "message" => "Error al obtener el catálogo de cursos."
    ]);
}
?>