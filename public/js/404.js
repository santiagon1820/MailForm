
// Crear estrellas de fondo
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Posición aleatoria
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamaño aleatorio
        const size = Math.random() * 3;

        // Establecer estilos
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Retraso de animación aleatorio
        star.style.animationDelay = `${Math.random() * 5}s`;

        starsContainer.appendChild(star);
    }
}

// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Tamaño aleatorio
        const size = Math.random() * 5 + 2;

        // Posición horizontal aleatoria
        const x = Math.random() * 100;

        // Duración y retraso aleatorios
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;

        // Establecer estilos
        particle.style.left = `${x}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
}

// Efecto de escritura para el texto
function typeEffect() {
    const text = "¡Ups! Te has perdido en el espacio";
    const heading = document.querySelector('h2');
    let i = 0;

    heading.textContent = '';

    const timer = setInterval(() => {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

// Inicializar efectos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createParticles();
    typeEffect();

    // Efecto de interacción para el astronauta
    const astronaut = document.querySelector('.astronaut');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        astronaut.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px) rotate(${x * 10 - 5}deg)`;
    });
});