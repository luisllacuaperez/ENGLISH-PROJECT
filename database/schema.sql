-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS techlearn_db;
USE techlearn_db;

-- Tabla de Usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Cursos (Mapeada exactamente como tu arreglo en app.js)
CREATE TABLE courses (
    id VARCHAR(50) PRIMARY KEY, -- Ej: 'python-basics'
    title VARCHAR(150) NOT NULL,
    level VARCHAR(50) NOT NULL,
    level_class VARCHAR(100),
    duration VARCHAR(100),
    lessons INT,
    instructor VARCHAR(100),
    description TEXT,
    rating DECIMAL(3,1),
    reviews INT,
    image VARCHAR(255)
);