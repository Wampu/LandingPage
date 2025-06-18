// Smooth scrolling para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elementos que se animarán al aparecer
    const animatedElements = document.querySelectorAll('.feature-card, .role-card, .tech-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            empresa: formData.get('empresa'),
            telefono: formData.get('telefono'),
            flota: formData.get('flota'),
            mensaje: formData.get('mensaje')
        };

        // Validar campos requeridos
        if (!data.nombre || !data.email || !data.empresa || !data.flota) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }

        // Crear el cuerpo del email
        const emailBody = createEmailBody(data);
        
        // Crear enlace mailto
        const mailtoLink = `mailto:wampu.contacto@gmail.com?subject=Solicitud de Demo - ${data.empresa}&body=${encodeURIComponent(emailBody)}`;
        
        // Abrir cliente de correo
        window.location.href = mailtoLink;
        
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Limpiar formulario
        this.reset();
    });

    // Header transparente al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(1, 52, 89, 0.95) 0%, rgba(0, 168, 232, 0.95) 100%)';
        } else {
            header.style.background = 'linear-gradient(135deg, #013459 0%, #00a8e8 100%)';
        }
    });

    // Efecto parallax sutil para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animación de contador para las estadísticas (si las hay)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 10);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Efecto de escritura para el título principal
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }
});

// Función para crear el cuerpo del email
function createEmailBody(data) {
    return `Hola equipo de Wampu,

Me interesa conocer más sobre su solución de gestión de flotas empresariales.

INFORMACIÓN DE CONTACTO:
────────────────────────
Nombre: ${data.nombre}
Email: ${data.email}
Empresa: ${data.empresa}
Teléfono: ${data.telefono || 'No proporcionado'}
Tamaño de flota: ${data.flota}

${data.mensaje ? `MENSAJE ADICIONAL:
────────────────────────
${data.mensaje}

` : ''}SOLICITUD:
────────────────────────
Solicito una demostración personalizada de Wampu para evaluar cómo puede beneficiar a nuestra empresa en la gestión de nuestra flota vehicular.

Estoy particularmente interesado/a en:
• Módulo de mantenimiento preventivo
• Sistema de asignación de conductores
• Seguimiento GPS en tiempo real
• Notificaciones automatizadas

Quedo a la espera de su contacto para coordinar una reunión.

Saludos cordiales,
${data.nombre}
${data.empresa}`;
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    // Crear elemento de mensaje si no existe
    let successMsg = document.querySelector('.success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ¡Perfecto! Se ha abierto tu cliente de correo con la información pre-llenada. 
            Solo tienes que enviar el email y nos pondremos en contacto contigo pronto.
        `;
        document.querySelector('.contact-form').appendChild(successMsg);
    }
    
    // Mostrar mensaje
    successMsg.classList.add('show');
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

// Función para manejar el resize de ventana
window.addEventListener('resize', function() {
    // Ajustar animaciones según el tamaño de pantalla
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reducir animaciones en móvil para mejor rendimiento
        document.body.style.animation = 'none';
    }
});

// Efecto de ondas en botones
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Preloader (opcional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Lazy loading para imágenes (si las hay)
function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Función para detectar si el usuario está en móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimizaciones para dispositivos móviles
if (isMobileDevice()) {
    // Reducir animaciones en dispositivos móviles
    document.body.classList.add('mobile-device');
    
    // Deshabilitar efectos de hover en móvil
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            .feature-card:hover,
            .role-card:hover,
            .btn:hover,
            .nav-links a:hover {
                transform: none;
                box-shadow: initial;
            }
        }
    `;
    document.head.appendChild(style);
}

// Función para validar el formulario en tiempo real
function setupRealTimeValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingresa un email válido';
        }
    }
    
    // Mostrar/ocultar error
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#ff4757';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        field.parentNode.appendChild(errorElement);
    } else {
        field.classList.remove('error');
    }
    
    return isValid;
}

// Inicializar validación en tiempo real cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupRealTimeValidation);