<?php
require_once '../config.php';

try {
    // Seleccionamos solo a los estudiantes (no queremos que un admin borre a otro admin)
    $query = "SELECT id, name, email, status, created_at FROM users WHERE role = 'student' ORDER BY created_at DESC";
    $stmt = $pdo->query($query);
    $users = $stmt->fetchAll();

    echo json_encode(["status" => "success", "data" => $users]);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al obtener usuarios."]);
}
?>