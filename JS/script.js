const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const navbar = document.querySelector(".navbar");
const menuBttn = document.querySelector(".menu-bttn");

let currentSlide = 0;
const maxSlide = slides.length;

// Criar os dots de navegação
const createDots = () => {
    slides.forEach((_, i) => {
        dotContainer.innerHTML += `<button class="dots_dot" data-slide="${i}"></button>`;
    });
};

// Ativar o dot correspondente ao slide atual
const activeDot = (slide) => {
    document
        .querySelectorAll(".dots_dot")
        .forEach((dot) => dot.classList.remove("active"));
    
    const activeDotElement = document.querySelector(`.dots_dot[data-slide="${slide}"]`);
    if (activeDotElement) {
        activeDotElement.classList.add("active");
    }
};

// Ir para um slide específico
const goToSlide = (slideIndex) => {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slideIndex)}%)`;
    });
};

// Próximo slide
const nextSlide = () => {
    if (currentSlide === maxSlide - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
};

// Slide anterior
const prevSlide = () => {
    if (currentSlide === 0) {
        currentSlide = maxSlide - 1;
    } else {
        currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
};

// Inicializar o slider quando a página carregar
window.addEventListener("load", () => {
    createDots();
    goToSlide(currentSlide);
    activeDot(currentSlide);
});

// Event listeners para as setas (com verificação de existência)
if (left) {
    left.addEventListener("click", prevSlide);
}

if (right) {
    right.addEventListener("click", nextSlide);
}

// Event listener para os dots
if (dotContainer) {
    dotContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("dots_dot")) {
            const slide = Number(e.target.dataset.slide);
            goToSlide(slide);
            activeDot(slide);
            currentSlide = slide;
        }
    });
}

// Menu mobile toggle
if (menuBttn && navbar) {
    menuBttn.addEventListener("click", () => {
        navbar.classList.toggle("show-menu");
    });
}
