// JS/script.js (Versão Otimizada e Corrigida)

document.addEventListener("DOMContentLoaded", function() {

    // =======================================================
    // 1. LÓGICA DO SISTEMA DE LOGIN (COM SELETOR CORRIGIDO)
    // =======================================================
    
    const dadosUsuarioLogado = sessionStorage.getItem("usuarioLogado");

    if (dadosUsuarioLogado) {
        const usuarioLogado = JSON.parse(dadosUsuarioLogado);

        // ATENÇÃO: Seletor corrigido para "login.html"
        const linkConta = document.querySelector('a[href="login.html"]');
        
        if (linkConta) {
            linkConta.textContent = `Olá, ${usuarioLogado.usuario}`;
            linkConta.href = "#"; // Remove o link para a página de login

            const li = linkConta.parentElement;
            const navUl = li.parentElement;

            const logoutLi = document.createElement("li");
            logoutLi.innerHTML = '<a href="#" id="logout">Sair</a>';
            
            navUl.appendChild(logoutLi);

            document.getElementById("logout").addEventListener("click", function(e) {
                e.preventDefault();
                sessionStorage.removeItem("usuarioLogado");
                window.location.reload(); // Recarrega a página para resetar
            });
        }
    }

    // =======================================================
    // 2. LÓGICA DO SLIDER E MENU (MOVIDA PARA CÁ)
    // =======================================================

    const slides = document.querySelectorAll(".slide");
    const dotContainer = document.querySelector(".dots");
    // ATENÇÃO: Suas setas no HTML têm as classes "left" e "right"
    const left = document.querySelector(".slider-arrow.left"); 
    const right = document.querySelector(".slider-arrow.right");
    const navbar = document.querySelector(".navbar");
    const menuBttn = document.querySelector(".menu-bttn");

    // Se não houver slides, não execute a lógica do slider
    if (slides.length > 0) {
        let currentSlide = 0;
        const maxSlide = slides.length;

        // --- Funções do Slider ---
        const createDots = () => {
            slides.forEach((_, i) => {
                dotContainer.innerHTML += `<button class="dots_dot" data-slide="${i}"></button>`;
            });
        };

        const activeDot = (slide) => {
            document.querySelectorAll(".dots_dot").forEach(dot => dot.classList.remove("active"));
            
            const activeDotElement = document.querySelector(`.dots_dot[data-slide="${slide}"]`);
            if (activeDotElement) {
                activeDotElement.classList.add("active");
            }
        };

        const goToSlide = (slideIndex) => {
            slides.forEach((s, i) => {
                s.style.transform = `translateX(${100 * (i - slideIndex)}%)`;
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide === maxSlide - 1) ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
            activeDot(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide === 0) ? maxSlide - 1 : currentSlide - 1;
            goToSlide(currentSlide);
            activeDot(currentSlide);
        };

        // --- Inicialização do Slider ---
        // (Movido do 'window.load' para aqui)
        createDots();
        goToSlide(currentSlide);
        activeDot(currentSlide);

        // --- Event Listeners do Slider ---
        if (left) {
            left.addEventListener("click", prevSlide);
        }
        if (right) {
            right.addEventListener("click", nextSlide);
        }
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

        // Auto-play (Opcional, adicionei para você)
        setInterval(nextSlide, 7000); // Muda a cada 7 segundos
    }

    // --- Lógica do Menu Mobile ---
    if (menuBttn && navbar) {
        menuBttn.addEventListener("click", () => {
            navbar.classList.toggle("show-menu");
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("favoritos-home-container");

    if (!container) return;

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const quatroFavoritos = favoritos.slice(0, 4);

    if (quatroFavoritos.length === 0) {
        container.innerHTML = "<p>Nenhum produto favoritado ainda.</p>";
        return;
    }

    quatroFavoritos.forEach(produto => {
        container.innerHTML += `
            <div class="product-card" onclick="window.location.href='produto.html?id=${produto.id}'">
                <img src="${produto.imagem}">
                <h3>${produto.nome}</h3>
            </div>
        `;
    });
});
