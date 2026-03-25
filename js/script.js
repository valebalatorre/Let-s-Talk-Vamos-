// Elementos del DOM
const navbar = document.querySelector(".navbar");
const btnTop = document.getElementById("btnTop");
let lastScrollY = window.scrollY;

// Evento de Scroll
window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    // 1. Mostrar/Ocultar Navbar
    if (currentScroll > lastScrollY && currentScroll > 150) {
        navbar.classList.add("navbar--hidden");
    } else {
        navbar.classList.remove("navbar--hidden");
    }
    lastScrollY = currentScroll;

    // 2. Mostrar/Ocultar Botón Volver Arriba
    if (currentScroll > 300) {
        btnTop.classList.add("visible");
    } else {
        btnTop.classList.remove("visible");
    }
});

// 3. Scroll suave a la siguiente sección (Cursos)
function scrollToCursos() {
    const cursosSection = document.getElementById("cursos");
    if (cursosSection) {
        cursosSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 4. Click Volver Arriba
btnTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 5.Swiper testimonios
const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 800,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});