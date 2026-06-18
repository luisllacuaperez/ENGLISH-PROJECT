// TechLearn Academy - Dynamic Frontend Logic
const pageName = window.location.pathname.split('/').pop() || 'index.html';
// 1. Mock Database of Courses
// Variable global vacía. Ahora permitiremos que cambie (let en lugar de const)
let COURSES = [];

// ========================================================
// CONTENIDO ESTÁTICO DE LOS CURSOS (Módulos y Videos)
// ========================================================
// ========================================================
// CONTENIDO ESTÁTICO DE LOS CURSOS (Módulos y Videos)
// ========================================================
const COURSE_CONTENT = {
    "python-basics": [
        { module: 1, title: "1. Introducción a Python y Entorno", video: "https://www.youtube.com/embed/DAdRO6ByBoU?si=wMTrYY_WCTXgaRJP" },
        { module: 2, title: "2. Variables y Tipos de Datos", video: "https://www.youtube.com/embed/EaWsOcc7R2M?si=M0m2_cfOOpE46O4C" },
        { module: 3, title: "3. Operadores Matemáticos", video: "https://www.youtube.com/embed/6sOEpHItJHs?si=8DCroNUlaFQN54sl" },
        { module: 4, title: "4. Condicionales (if/else)", video: "https://www.youtube.com/embed/43NYFfUM5uU?si=Ar7XJ0bxJ7Jngn_n" },
        { module: 5, title: "5. Bucles (for y while)", video: "https://www.youtube.com/embed/aeXYFaIEELA?si=B-zcLz0b30hK74tQ" },
        { module: 6, title: "6. Funciones en Python", video: "https://www.youtube.com/embed/_2bRQFzPiVA?si=t4ZXWxAdBlfoUrj8" },
        { module: 7, title: "7. Listas y Tuplas", video: "https://www.youtube.com/embed/62UvizLLcNU?si=t1HTEJRyik1Ge9Mw" },
        { module: 8, title: "8. Diccionarios y Sets", video: "https://www.youtube.com/embed/B10alyprBOc?si=XUmo7aQ67dmg6YnE" },
        { module: 9, title: "9. Manejo de Errores (try/except)", video: "https://www.youtube.com/embed/dPkoI6BQc0E?si=t-kflxgnbtKWviFv" },
        { module: 10, title: "10. Proyecto Final: Primer Script", video: "https://www.youtube.com/embed/GH6TOuYBVk0?si=RKevmidQQB1KYTD_" }
    ],
    "sql-databases": [
        { module: 1, title: "1. ¿Qué es una Base de Datos y SQL?", video: "https://www.youtube.com/embed/knVwokXITGI?si=hL3QDCw6cNERC6EV" },
        { module: 2, title: "2. Instalación de MySQL y Herramientas", video: "https://www.youtube.com/embed/zDEUHPUl4iY?si=Eul3GdFIT0D6p3zF" },
        { module: 3, title: "3. Creación de Tablas y Tipos de Datos", video: "https://www.youtube.com/embed/AstzeuTJ9UA?si=OW44nquQpVZSpIC3" },
        { module: 4, title: "4. Clausula SELECT y Filtros Esenciales", video: "https://www.youtube.com/embed/tex3fKmIjK4?si=kQD_ddxNX3TJC7W4" },
        { module: 5, title: "5. Operadores Lógicos (AND, OR, NOT)", video: "https://www.youtube.com/embed/UU_825pJu8g?si=6ixPmpY-J7Kti3-7" },
        { module: 6, title: "6. Ordenamiento y Limitación de Datos", video: "https://www.youtube.com/embed/TkBrpPiQ8OQ?si=Wax4e5MRcv8q7-lL" },
        { module: 7, title: "7. Funciones de Agregación (SUM, AVG, COUNT)", video: "https://www.youtube.com/embed/kQwDyx1wiXM?si=bodFNv_Z3IoldX5-" },
        { module: 8, title: "8. Relaciones y Llaves Foráneas", video: "https://www.youtube.com/embed/tyyhIsDmVM0?si=Umc44cPYx3i6pkAr" },
        { module: 9, title: "9. Consultas Multitabla (INNER JOIN)", video: "https://www.youtube.com/embed/0BstRqp6Svg?si=xr_-zcxalu3qQG2i" },
        { module: 10, title: "10. Prácticas y Consultas Avanzadas", video: "https://www.youtube.com/embed/X4ffVGDI2Fo?si=96w_n-_civfoWhmm" }
    ],
    "mobile-development": [
        { module: 1, title: "1. Introducción al Desarrollo Móvil", video: "https://www.youtube.com/embed/H8tykt3pKTU?si=tex-CWux5F7eTf3a" },
        { module: 2, title: "2. Configuración del Entorno de Trabajo", video: "https://www.youtube.com/embed/-2wcHqLAbsY?si=9eD0Dq89HXBbA2V1" },
        { module: 3, title: "3. Fundamentos del Lenguaje de Programación", video: "https://www.youtube.com/embed/W-AwQpWM4f0?si=D4u3xGQ_Pn87mII_" },
        { module: 4, title: "4. Diseño de Interfaces de Usuario (UI)", video: "https://www.youtube.com/embed/uCGkaYYhE9k?si=hA1HU4t9vPxgtIvU" },
        { module: 5, title: "5. Contenedores y Layouts Comunes", video: "https://www.youtube.com/embed/x2k1kg86w3A?si=KidFIBLnYT2bSC3r" },
        { module: 6, title: "6. Gestión de Estados y Eventos (Clicks)", video: "https://www.youtube.com/embed/-nOxpsaNB0s?si=CvK85Aa1JXrc4hyP" },
        { module: 7, title: "7. Navegación entre Múltiples Pantallas", video: "https://www.youtube.com/embed/JFLcfW676VA?si=G8QuQVaGsqDUkG1M" },
        { module: 8, title: "8. Consumo de APIs y Datos Externos", video: "https://www.youtube.com/embed/f9BCfJwENJM?si=k0-dfNSAJHYN4IjK" },
        { module: 9, title: "9. Almacenamiento Local de Datos", video: "https://www.youtube.com/embed/TtnNohvz_8g?si=wvU-PaDvnNAqV-ED" },
        { module: 10, title: "10. Compilación y Despliegue en Dispositivos", video: "https://www.youtube.com/embed/UFbdO-RmxUk?si=Q0UzzICPEI6pNeiF" }
    ],
    "english-computer-science": [
        { module: 1, title: "1. Tech Vocabulary for Software Engineering", video: "https://www.youtube.com/embed/FhqjtB3qcrs?si=5vm5mC_3HSK4DpkU" },
        { module: 2, title: "2. Reading Technical Documentation Efficiently", video: "https://www.youtube.com/embed/SWr6NW2osqc?si=5xjSSFhk9ZquG9Vt" },
        { module: 3, title: "3. Command Line & Version Control Terminology", video: "https://www.youtube.com/embed/K6Q31YkorUE?si=5T65SkGwUpfYu6_W" },
        { module: 4, title: "4. Writing Clean Code Comments in English", video: "https://www.youtube.com/embed/wSDyiEjhp8k?si=jaXkUjfZWL_FQ_xi" },
        { module: 5, title: "5. Describing Algorithms and Logic Flow", video: "https://www.youtube.com/embed/JJkWemM03Lg?si=79rPNwLBSz5DRxdj" },
        { module: 6, title: "6. Database & SQL Query Terminology", video: "https://www.youtube.com/embed/zsjvFFKOm3c?si=H95Ia-y14CH8BN3e" },
        { module: 7, title: "7. Common Error Messages & Debugging Phrasal Verbs", video: "https://www.youtube.com/embed/WNTWNNOEfOo?si=pMwJqZS8YjfZEh4Z" },
        { module: 8, title: "8. Technical Communication in Pull Requests", video: "https://www.youtube.com/embed/LheeJPkdCu8?si=lwj1NvmReTo-NAeU" },
        { module: 9, title: "9. Tech Interview Preparation & Coding Tasks", video: "https://www.youtube.com/embed/oKQcDjxsOvg?si=_T6EFI_3-RKFPe9u" },
        { module: 10, title: "10. Professional English Presentation Tips", video: "https://www.youtube.com/embed/XlmKqkZkfqI?si=VWC8ue2TpDnxnUqk" }
    ]
};

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
// Función para desmatricularse interactuando con MySQL
async function handleLeaveCourse(courseId) {
    const user = getLoggedUser();
    if (!user) return;

    // AHORA USAMOS NUESTRO NUEVO MODAL DE TAILWIND ESPERANDO LA RESPUESTA
    const isConfirmed = await showConfirmModal(
        'Drop Course', 
        'Are you sure you want to drop this course? All your learning checkpoints will be permanently cleared.'
    );

    // Si el usuario hizo clic en "Cancel", isConfirmed es false y la función se detiene aquí.
    if (!isConfirmed) return;

    // Si hizo clic en "Drop Course", ejecutamos el borrado en la base de datos
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
            showToast('Course Dropped', result.message, 'success');
            
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

// 5. Global UI Init Helpers
document.addEventListener("DOMContentLoaded", () => {
  initLessonPage();
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

// ========================================================
// MODAL DE CONFIRMACIÓN CON TAILWIND CSS
// ========================================================
function showConfirmModal(title, message) {
    return new Promise((resolve) => {
        // 1. Crear el fondo oscuro difuminado (Overlay)
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
        
        // 2. Crear la caja del modal
        const modal = document.createElement('div');
        modal.className = 'bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 transform scale-95 transition-transform duration-300';
        
        modal.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-2xl mb-4">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 class="text-lg font-extrabold text-slate-800 mb-2">${title}</h3>
            <p class="text-sm text-slate-500 mb-6 leading-relaxed">${message}</p>
            <div class="flex gap-3 justify-end w-full">
                <button id="cancel-btn" class="flex-1 px-5 py-3 rounded-full text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Cancel</button>
                <button id="confirm-btn" class="flex-1 px-5 py-3 rounded-full text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20">Drop Course</button>
            </div>
        `;
        
        // 3. Inyectarlos en la página
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // 4. Activar la animación de entrada
        requestAnimationFrame(() => {
            overlay.classList.remove('opacity-0');
            modal.classList.remove('scale-95');
        });
        
        // 5. Función para cerrar el modal con animación
        const closeModal = (result) => {
            overlay.classList.add('opacity-0');
            modal.classList.add('scale-95');
            setTimeout(() => {
                overlay.remove();
                resolve(result); // Devuelve true (Sí) o false (Cancelar)
            }, 300); // Espera a que termine la animación para borrarlo del HTML
        };
        
        // 6. Escuchar los clics de los botones
        modal.querySelector('#cancel-btn').addEventListener('click', () => closeModal(false));
        modal.querySelector('#confirm-btn').addEventListener('click', () => closeModal(true));
    });
}

// ========================================================
// LÓGICA DE LA PÁGINA DE LECCIONES (lesson.html)
// ========================================================
function initLessonPage() {
    // 1. Verificamos si estamos en la página de lecciones
    const videoIframe = document.getElementById('lesson-video');
    if (!videoIframe) return;

    // 2. Leemos la URL (ej. ?course=python-basics&module=1)
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');
    const currentModule = parseInt(urlParams.get('module')) || 1;

    // 3. Buscamos el curso en nuestro diccionario estático
    const courseData = COURSE_CONTENT[courseId];
    if (!courseData) {
        document.getElementById('lesson-title').textContent = "Curso no encontrado o en mantenimiento.";
        return;
    }

    const moduleData = courseData.find(m => m.module === currentModule);
    
    // 4. Inyectamos los datos en la pantalla
    document.getElementById('lesson-course-name').textContent = courseId.replace('-', ' ');
    document.getElementById('lesson-title').textContent = `Módulo ${moduleData.module}: ${moduleData.title}`;
    videoIframe.src = moduleData.video;

    // Redireccionar a video en Youtube:
    const externalLink = document.getElementById('external-video-link');
    if(externalLink) externalLink.href = moduleData.video;

    // 5. Dibujamos el temario lateral dinámicamente
    const sidebar = document.getElementById('lesson-sidebar');
    sidebar.innerHTML = '';
    courseData.forEach(m => {
        const isCurrent = m.module === currentModule;
        const btnClass = isCurrent 
            ? 'bg-blue-50 border-blue-200 text-blue-700' 
            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50';

        sidebar.innerHTML += `
            <a href="lesson.html?course=${courseId}&module=${m.module}" 
               class="flex items-center gap-3 p-4 rounded-xl border ${btnClass} transition-all">
                <div class="w-8 h-8 rounded-full ${isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'} flex items-center justify-center font-bold text-sm shrink-0">
                    ${m.module}
                </div>
                <span class="text-sm font-bold leading-tight">${m.title}</span>
            </a>
        `;
    });

    // 6. Lógica del botón "Marcar como completado"
    const completeBtn = document.getElementById('complete-module-btn');
    completeBtn.addEventListener('click', async () => {
        const user = getLoggedUser();
        if (!user) return;

        // Efecto visual de carga
        completeBtn.disabled = true;
        completeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-lg"></i> Guardando...';

        try {
            // Mandamos la petición al PHP de Luis
            const response = await fetch('http://localhost/techlearnAcademy/api/courses/update_progress.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, course_id: courseId })
            });

            const result = await response.json();

            if (result.status === 'success') {
                showToast('¡Excelente!', '+10% de progreso guardado.', 'success');
                
                // Redirigir al siguiente módulo si existe
                setTimeout(() => {
                    const nextModule = currentModule + 1;
                    if (courseData.find(m => m.module === nextModule)) {
                        window.location.href = `lesson.html?course=${courseId}&module=${nextModule}`;
                    } else {
                        showToast('¡Curso Terminado!', 'Has completado todos los módulos.', 'success');
                        setTimeout(() => window.location.href = 'dashboard.html', 1500);
                    }
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            showToast('Error', 'Problema de conexión.', 'error');
            completeBtn.disabled = false;
        }
    });
}