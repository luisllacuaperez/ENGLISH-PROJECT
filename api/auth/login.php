<?php
// api/auth/login.php
require_once '../config.php';

// Capturar el JSON enviado desde el frontend
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = $data->email;
    $password = $data->password;

    try {
        // Buscar al usuario por su email
        $query = "SELECT * FROM users WHERE email = :email LIMIT 1";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch();

        // Verificar si el usuario existe y la contraseña coincide
        if ($user && password_verify($password, $user['password'])) {
            http_response_code(200); // OK
            
            // Devolvemos los datos del usuario (¡Ojo! Nunca devuelvas la contraseña)
            echo json_encode([
                "status" => "success",
                "message" => "Login exitoso",
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email'],
                    "avatar" => $user['avatar'],
                    "enrolledAt" => $user['created_at']
                ]
            ]);
        } else {
            // Credenciales incorrectas
            http_response_code(401); // No autorizado
            echo json_encode([
                "status" => "error",
                "message" => "Correo o contraseña incorrectos."
            ]);
        }
    } catch (\PDOException $e) {
        http_response_code(500); // Error de servidor
        echo json_encode([
            "status" => "error",
            "message" => "Error interno al iniciar sesión."
        ]);
    }
} else {
    http_response_code(400); // Faltan datos
    echo json_encode([
        "status" => "error",
        "message" => "Por favor, ingresa correo y contraseña."
    ]);
}
?>