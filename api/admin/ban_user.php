<?php
require_once '../config.php';
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id)) {
    try {
        // Borrado lógico: Cambiamos el estado a 'banned'
        $query = "UPDATE users SET status = 'banned' WHERE id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':id', $data->user_id);
        
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Estudiante eliminado y bloqueado del sistema."]);
        }
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al procesar la acción."]);
    }
}
?>