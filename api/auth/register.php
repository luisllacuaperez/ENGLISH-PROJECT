<?php
// Incluir la conexión a la base de datos
require_once '../config.php';

// Capturar el cuerpo de la petición (el JSON enviado desde JavaScript)
$data = json_decode(file_get_contents("php://input"));

// Verificar que los datos no estén vacíos
if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    // Sanitización de entradas
    // strip_tags elimina etiquetas HTML/PHP, htmlspecialchars convierte caracteres especiales en texto inofensivo
    $name = htmlspecialchars(strip_tags($data->name), ENT_QUOTES, 'UTF-8');
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    
    // Encriptar la contraseña (NUNCA guardar contraseñas en texto plano)
    $password_hashed = password_hash($data->password, PASSWORD_BCRYPT);

    try {
        // Consulta SQL preparada para evitar Inyección SQL
        $query = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
        $stmt = $pdo->prepare($query);
        
        // Vincular los parámetros
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password_hashed);

        // Ejecutar y responder
        if ($stmt->execute()) {
            http_response_code(201); // Código HTTP: Creado
            echo json_encode([
                "status" => "success", 
                "message" => "Usuario registrado correctamente."
            ]);
        }
    } catch (\PDOException $e) {
        http_response_code(400); // Código HTTP: Bad Request
        
        // El código 23000 en MySQL significa que hubo una violación de restricción UNIQUE (email duplicado)
        if ($e->getCode() == 23000) {
            echo json_encode([
                "status" => "error", 
                "message" => "Este correo electrónico ya está registrado."
            ]);
        } else {
            echo json_encode([
                "status" => "error", 
                "message" => "Error interno al registrar el usuario."
            ]);
        }
    }
} else {
    // Faltan datos en el envío
    http_response_code(400);
    echo json_encode([
        "status" => "error", 
        "message" => "Por favor, completa todos los campos."
    ]);
}
?>