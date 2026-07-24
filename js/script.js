// Elementos del DOM
const navbar = document.querySelector(".navbar");
const btnTop = document.getElementById("btnTop");
let lastScrollY = window.scrollY;

// Evento de Scroll
let scrollTicking = false;

function handleScroll() {
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

    scrollTicking = false;
}

window.addEventListener("scroll", () => {
    if (!scrollTicking) {
        requestAnimationFrame(handleScroll);
        scrollTicking = true;
    }
});

// 3. Scroll suave a la siguiente sección (Cursos)
function scrollToCursos() {
    const cursosSection = document.getElementById("cursos");
    if (cursosSection) {
        cursosSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 4. Click Scroll to Top
btnTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 5. Desplegable "Cursos" (2 niveles)
document.querySelectorAll(".nav-arrow-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parent = btn.closest(".nav-item-dropdown, .nav-dropdown-item");
        const wasOpen = parent.classList.contains("open");

        // Cierra los demás desplegables abiertos al mismo nivel
        parent.parentElement.querySelectorAll(":scope > .open").forEach((el) => {
            if (el !== parent) el.classList.remove("open");
        });

        parent.classList.toggle("open", !wasOpen);
        btn.setAttribute("aria-expanded", String(!wasOpen));

        // Si se cierra el nivel padre, cierra también su submenú abierto
        if (wasOpen) {
            parent.querySelectorAll(".open").forEach((el) => el.classList.remove("open"));
        }
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item-dropdown")) {
        document.querySelectorAll(".nav-item-dropdown.open, .nav-dropdown-item.open").forEach((el) => {
            el.classList.remove("open");
        });
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll(".nav-item-dropdown.open, .nav-dropdown-item.open").forEach((el) => {
            el.classList.remove("open");
        });
    }
});

// 5b. Botón hamburguesa (notebooks chicas, tablets y celulares)
const navHamburger = document.querySelector(".nav-hamburger");
if (navHamburger) {
    navHamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = navbar.classList.toggle("nav-open");
        navHamburger.setAttribute("aria-expanded", String(isOpen));
        if (!isOpen) {
            document.querySelectorAll(".nav-item-dropdown.open, .nav-dropdown-item.open").forEach((el) => {
                el.classList.remove("open");
            });
        }
    });

    document.addEventListener("click", (e) => {
        if (navbar.classList.contains("nav-open") && !e.target.closest(".navbar")) {
            navbar.classList.remove("nav-open");
            navHamburger.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navbar.classList.contains("nav-open")) {
            navbar.classList.remove("nav-open");
            navHamburger.setAttribute("aria-expanded", "false");
        }
    });
}

// 6. Scroll suave y lento hacia una sección (ej: botón "Programas")
document.querySelectorAll(".btn-scroll-slow").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const targetId = btn.getAttribute("href");
        const target = targetId ? document.querySelector(targetId) : null;
        if (!target) return;
        e.preventDefault();

        const duration = 1400;
        const startY = window.scrollY;
        const endY = target.getBoundingClientRect().top + startY - 20;
        const startTime = performance.now();

        function step(now) {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            window.scrollTo(0, startY + (endY - startY) * eased);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });
});

// 7.Swiper testimonios (solo en páginas que lo incluyen)
if (typeof Swiper !== "undefined" && document.querySelector(".mySwiper")) {
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
}