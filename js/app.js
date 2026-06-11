// TechLearn Academy - Dynamic Frontend Logic
const pageName = window.location.pathname.split('/').pop() || 'index.html';
// 1. Mock Database of Courses
// Variable global vacía. Ahora permitiremos que cambie (let en lugar de const)
let COURSES = [];

// Nueva función para cargar los cursos desde MySQL
async function loadCoursesFromDB() {
  try {
    const response = await fetch('http://localhost/techlearnAcademy/api/courses/list.php');
    const result = await response.json();
    
    if (result.status === 'success') {
      // Formateamos los datos de la base de datos para que encajen exactamente 
      // con lo que tu frontend actual (HTML) espera leer
      COURSES = result.data.map(course => ({
        id: course.id,
        title: course.title,
        level: course.level,
        levelClass: course.level_class,
        duration: course.duration,
        lessons: course.lessons,
        instructor: course.instructor,
        description: course.description,
        rating: course.rating,
        reviews: course.reviews,
        image: course.image,
        topics: [] // Por ahora lo dejamos vacío, en el futuro se pueden traer de otra tabla
      }));
    }
  } catch (error) {
    console.error("Error cargando los cursos desde el backend:", error);
  }
}

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
      
      // Reemplaza la redirección antigua (window.location.href = 'dashboard.html') por esto:
      setTimeout(() => {
        if (result.user.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'dashboard.html';
        }
      }, 1200);
    } else {
      showToast('Error', result.message, 'error');
    }

  } catch (error) {
    console.error('Error en el login:', error);
    showToast('Error de conexión', 'No se pudo conectar con el servidor', 'error');
  }
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

// Función para matricularse en un curso interactuando con MySQL
async function enrollCourseDB(courseId) {
    const user = getLoggedUser();
    
    // Si no hay usuario logueado, lo mandamos al login
    if (!user) {
        showToast('Acceso denegado', 'Debes iniciar sesión para matricularte', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    try {
        const response = await fetch('http://localhost/techlearnAcademy/api/courses/enroll.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                course_id: courseId
            })
        });

        const result = await response.json();

        if (result.status === 'success') {
            showToast('¡Éxito!', result.message, 'success');
            // Opcional: Redirigir al dashboard para que vea su nuevo curso después de 1.5s
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Mostrará el error si ya está matriculado
            showToast('Aviso', result.message, 'error');
        }
    } catch (error) {
        console.error('Error en la matrícula:', error);
        showToast('Error', 'No se pudo conectar con el servidor', 'error');
    }
}

// Función para desmatricularse interactuando con MySQL
async function handleLeaveCourse(courseId) {
    const user = getLoggedUser();
    if (!user) return;

    // Pedimos confirmación al usuario antes de borrar
    if (confirm('¿Estás seguro de que deseas abandonar este curso? Se perderá tu progreso.')) {
        try {
            const response = await fetch('http://localhost/techlearnAcademy/api/courses/leave.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id,
                    course_id: courseId
                })
            });

            const result = await response.json();

            if (result.status === 'success') {
                showToast('Curso eliminado', result.message, 'success');
                
                // Volvemos a renderizar la lista del dashboard para que el curso desaparezca de la pantalla
                if (typeof renderEnrolledCourses === 'function') {
                    renderEnrolledCourses();
                } else {
                    window.location.reload();
                }
            } else {
                showToast('Error', result.message, 'error');
            }
        } catch (error) {
            console.error('Error al desmatricularse:', error);
            showToast('Error', 'No se pudo conectar con el servidor', 'error');
        }
    }
}

// 5. Global UI Init Helpers
document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
    // LÓGICA DEL NAVBAR DINÁMICO
    // ----------------------------------------------------
    const navContainer = document.getElementById('navbar-user-container');
    if (navContainer) {
        const user = getLoggedUser();
        
        if (user) {
            // Usuario LOGUEADO: Mostrar su foto, nombre y link al dashboard correcto
            const dashboardLink = user.role === 'admin' ? 'admin-dashboard.html' : 'dashboard.html';
            navContainer.innerHTML = `
                <a href="${dashboardLink}" class="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-smooth border border-transparent hover:border-slate-200">
                    <img src="${user.avatar}" alt="Avatar" class="w-8 h-8 rounded-full object-cover">
                    <span class="text-xs font-bold text-slate-700">${user.name.split(' ')[0]}</span>
                </a>
            `;
        } else {
            // Usuario NO LOGUEADO: Mostrar botones de Login y Register
            navContainer.innerHTML = `
                <a href="login.html" class="text-sm font-bold text-slate-600 hover:text-blue-500 transition-smooth">Sign In</a>
                <a href="register.html" class="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-blue-500/20 hover-lift transition-smooth">Register</a>
            `;
        }
    }
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
                    showToast('¡Registro exitoso!','Ya puedes iniciar sesión.','success');
                    setTimeout(() => { window.location.href = 'login.html'; }, 1500);

                } else {
                    // Mostrar error (ej. email duplicado)
                    showToast('Error: ' + result.message);
                }

            } catch (error) {
                console.error('Error en la petición Fetch:', error);
                showToast('Error','Hubo un problema de conexión con el servidor local.','error');
            }
        });
    }

    // Aquí agrego la lógica para actualizar el perfil en el Dashboard
    // Lógica para actualizar el perfil en el Dashboard
  const settingsForm = document.getElementById('settings-form');
  
  if (settingsForm) {
    // Rellenar el input con el nombre real guardado en localStorage al cargar la página
    const currentUser = getLoggedUser();
    if (currentUser) {
      document.getElementById('settings-name').value = currentUser.name;
    }

    settingsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const newName = document.getElementById('settings-name').value;
      const user = getLoggedUser();

      if (!user) return;

      try {
        const response = await fetch('http://localhost/techlearnAcademy/api/auth/update_profile.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: user.id,
            name: newName
          })
        });

        const result = await response.json();

        if (result.status === 'success') {
          // Actualizamos el nombre en el localStorage para que no se pierda al recargar
          user.name = newName;
          localStorage.setItem('techlearn_user', JSON.stringify(user));
          
          // Actualizamos los textos en la interfaz visual del dashboard instantáneamente
          document.getElementById('db-user-name').innerText = newName;
          document.getElementById('banner-user-name').innerText = newName.split(' ')[0];
          
          showToast('¡Actualizado!', result.message, 'success');
        } else {
          showToast('Error', result.message, 'error');
        }
      } catch (error) {
        console.error('Error actualizando perfil:', error);
        showToast('Error', 'No se pudo conectar con el servidor', 'error');
      }
    });
  }
});
