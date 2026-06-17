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

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(user_id, course_id)
);

INSERT INTO courses (id, title, level, level_class, duration, lessons, instructor, description, rating, reviews, image) VALUES
('python-basics', 'Basic Programming with Python', 'Beginner', 'bg-emerald-100 text-emerald-800', '6 Weeks (24 hours)', 12, 'Dr. Sarah Jenkins', 'Master the fundamentals of Python programming from scratch. Learn variables, control structures, object-oriented concepts, and basic data analysis using hands-on exercises.', 4.8, 128, 'images/course-python.jpg'),
('sql-databases', 'Database Management with SQL Server', 'Intermediate', 'bg-amber-100 text-amber-800', '8 Weeks (32 hours)', 16, 'Prof. David Miller', 'Learn to design, implement, and manage relational databases using Microsoft SQL Server. Master complex queries, joins, indexing, and store procedures to become database proficient.', 4.7, 94, 'images/course-sql.jpg'),
('english-computer-science', 'English Applied to Computer Science', 'Beginner', 'bg-emerald-100 text-emerald-800', '4 Weeks (16 hours)', 10, 'Emma Thompson, MA', 'Enhance your technical English vocabulary and communication skills specifically for software development, technical writing, documentation reading, and international collaboration.', 4.9, 215, 'images/course-english.jpg'),
('mobile-development', 'Mobile App Development', 'Intermediate', 'bg-amber-100 text-amber-800', '10 Weeks (40 hours)', 20, 'Alex Rivera, Senior Dev', 'Build native and cross-platform mobile apps for Android and iOS. Learn UI layout design, state management, API integration, database storage, and app publishing workflows.', 4.6, 82, 'images/course-mobile.jpg');

-- Tabla para los temas/lecciones de cada curso
CREATE TABLE lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    lesson_number INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    content TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabla para rastrear qué lecciones ha completado cada usuario
CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE(user_id, lesson_id)
);


ALTER TABLE enrollments ADD COLUMN progress INT DEFAULT 0;