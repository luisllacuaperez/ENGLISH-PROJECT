<?php
// api/auth/update_profile.php
require_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

// Verificamos que nos envíen el ID del usuario y el nuevo nombre
if (!empty($data->id) && !empty($data->name)) {
    try {
        $query = "UPDATE users SET name = :name WHERE id = :id";
        $stmt = $pdo->prepare($query);
        
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':id', $data->id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                "status" => "success", 
                "message" => "Perfil actualizado correctamente."
            ]);
        }
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error", 
            "message" => "Error al actualizar el perfil en la base de datos."
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "error", 
        "message" => "Datos incompletos para actualizar."
    ]);
}
?>