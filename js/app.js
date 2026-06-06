// TechLearn Academy - Dynamic Frontend Logic

// 1. Mock Database of Courses
const COURSES = [
  {
    id: 'python-basics',
    title: 'Basic Programming with Python',
    level: 'Beginner',
    levelClass: 'bg-emerald-100 text-emerald-800',
    duration: '6 Weeks (24 hours)',
    lessons: 12,
    instructor: 'Dr. Sarah Jenkins',
    description: 'Master the fundamentals of Python programming from scratch. Learn variables, control structures, object-oriented concepts, and basic data analysis using hands-on exercises.',
    rating: 4.8,
    reviews: 128,
    image: 'images/course-python.jpg',
    topics: [
      'Introduction to Programming & Python Setup',
      'Variables, Data Types, and Operators',
      'Control Flow: Conditionals and Loops',
      'Functions and Modules',
      'Working with Lists, Tuples, and Dictionaries',
      'File Handling & Exception Management',
      'Object-Oriented Programming (OOP) Basics'
    ]
  },
  {
    id: 'sql-databases',
    title: 'Database Management with SQL Server',
    level: 'Intermediate',
    levelClass: 'bg-amber-100 text-amber-800',
    duration: '8 Weeks (32 hours)',
    lessons: 16,
    instructor: 'Prof. David Miller',
    description: 'Learn to design, implement, and manage relational databases using Microsoft SQL Server. Master complex queries, joins, indexing, and store procedures to become database proficient.',
    rating: 4.7,
    reviews: 94,
    image: 'images/course-sql.jpg',
    topics: [
      'Relational Database Concepts',
      'Installing SQL Server & SSMS',
      'Data Definition Language (DDL): Tables & Relations',
      'Data Manipulation Language (DML): Select, Insert, Update, Delete',
      'Joins (Inner, Left, Right, Full) and Subqueries',
      'Aggregations, Grouping, and Having clauses',
      'Indexes, Views, and Performance Tuning'
    ]
  },
  {
    id: 'english-computer-science',
    title: 'English Applied to Computer Science',
    level: 'Beginner',
    levelClass: 'bg-emerald-100 text-emerald-800',
    duration: '4 Weeks (16 hours)',
    lessons: 10,
    instructor: 'Emma Thompson, MA',
    description: 'Enhance your technical English vocabulary and communication skills specifically for software development, technical writing, documentation reading, and international collaboration.',
    rating: 4.9,
    reviews: 215,
    image: 'images/course-english.jpg',
    topics: [
      'Technical Jargon & Developer Terminology',
      'Reading and Understanding API Documentation',
      'Writing Clear Git Commit Messages & PR Descriptions',
      'Participating in Agile Meetings and Standups',
      'Handling Technical Technical Interviews in English',
      'Writing Technical Reports and E-mails'
    ]
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    level: 'Intermediate',
    levelClass: 'bg-amber-100 text-amber-800',
    duration: '10 Weeks (40 hours)',
    lessons: 20,
    instructor: 'Alex Rivera, Senior Dev',
    description: 'Build native and cross-platform mobile apps for Android and iOS. Learn UI layout design, state management, API integration, database storage, and app publishing workflows.',
    rating: 4.6,
    reviews: 82,
    image: 'images/course-mobile.jpg',
    topics: [
      'Mobile Development Ecosystem (Android & iOS)',
      'UI Layouts, Components, and Responsive Design',
      'Managing State and User Navigation',
      'Interacting with Web REST APIs',
      'Local Storage and SQLite Databases',
      'Debugging, Testing, and Optimization',
      'App Store and Google Play Publishing Process'
    ]
  }
];

// 2. Initialize Local Storage Data
function getEnrolledCourses() {
  const enrolled = localStorage.getItem('techlearn_enrolled');
  return enrolled ? JSON.parse(enrolled) : [];
}

function enrollInCourse(courseId) {
  const enrolled = getEnrolledCourses();
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
    localStorage.setItem('techlearn_enrolled', JSON.stringify(enrolled));
    showToast('Success!', 'Successfully enrolled in course!', 'success');
    return true;
  }
  showToast('Info', 'You are already enrolled in this course!', 'info');
  return false;
}

function leaveCourse(courseId) {
  let enrolled = getEnrolledCourses();
  enrolled = enrolled.filter(id => id !== courseId);
  localStorage.setItem('techlearn_enrolled', JSON.stringify(enrolled));
  showToast('Removed', 'Successfully left the course', 'info');
}

// 3. User Mock Authentications
function getLoggedUser() {
  const user = localStorage.getItem('techlearn_user');
  return user ? JSON.parse(user) : null;
}

// función loginUser:
async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost/techlearnAcademy/api/auth/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const result = await response.json();

    if (result.status === 'success') {
      // Guardar el usuario real en localStorage para mantener la sesión
      localStorage.setItem('techlearn_user', JSON.stringify(result.user));
      
      showToast('¡Bienvenido!', `Has iniciado sesión correctamente como ${result.user.name}`, 'success');
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    } else {
      showToast('Error', result.message, 'error');
    }

  } catch (error) {
    console.error('Error en el login:', error);
    showToast('Error de conexión', 'No se pudo conectar con el servidor', 'error');
  }
}

function registerUser(name, email, password) {
  const user = {
    name: name,
    email: email,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    enrolledAt: new Date().toLocaleDateString()
  };
  localStorage.setItem('techlearn_user', JSON.stringify(user));
  showToast('Registered!', 'Account created successfully!', 'success');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1200);
}

function logoutUser() {
  localStorage.removeItem('techlearn_user');
  showToast('Logged Out', 'Successfully logged out', 'info');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 800);
}

// 4. Elegant Toast System
function showToast(title, message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'glass-panel p-4 rounded-2xl shadow-xl flex items-start gap-3 border border-white/60 pointer-events-auto transform translate-y-10 opacity-0 transition-all duration-300 ease-out';
  
  let iconColor = 'text-blue-500';
  let iconSvg = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  
  if (type === 'success') {
    iconColor = 'text-emerald-500';
    iconSvg = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  } else if (type === 'error') {
    iconColor = 'text-rose-500';
    iconSvg = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>';
  }

  toast.innerHTML = `
    <div class="${iconColor} shrink-0 mt-0.5">${iconSvg}</div>
    <div class="flex-1">
      <h4 class="font-bold text-slate-800 font-heading text-sm">${title}</h4>
      <p class="text-xs text-slate-600 mt-0.5">${message}</p>
    </div>
    <button class="text-slate-400 hover:text-slate-600 shrink-0 self-start" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;

  toastContainer.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);

  // Remove toast
  setTimeout(() => {
    toast.classList.add('translate-y-[-10px]', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// 5. Global UI Init Helpers
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar el formulario de registro
    // Asegúrate de que la etiqueta <form> en register.html tenga id="registerForm"
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evitar que la página se recargue

            // Capturar los valores de los inputs (asegúrate de que tengan estos IDs en tu HTML)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Hacer la petición asíncrona al backend
                const response = await fetch('http://localhost/techlearnAcademy/api/auth/register.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                });

                // Convertir la respuesta de PHP a un objeto JavaScript
                const result = await response.json();

                if (result.status === 'success') {
                    alert('¡Registro exitoso! Ya puedes iniciar sesión.');
                    // Redirigir al usuario a la página de login
                    window.location.href = 'login.html';
                } else {
                    // Mostrar error (ej. email duplicado)
                    alert('Error: ' + result.message);
                }

            } catch (error) {
                console.error('Error en la petición Fetch:', error);
                alert('Hubo un problema de conexión con el servidor local.');
            }
        });
    }
});
