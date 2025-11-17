// JS/script.js (Versão Unificada e Limpa)

// Espera o HTML ser carregado UMA ÚNICA VEZ
document.addEventListener("DOMContentLoaded", function() {

    // =======================================================
    // 1. LÓGICA DO SISTEMA DE LOGIN (COM SELETOR CORRIGIDO)
    // =======================================================
    
  const dadosUsuarioLogado = sessionStorage.getItem("usuarioLogado");

    // Ele SÓ verifica se o usuário existe para mudar o menu
    if (dadosUsuarioLogado) {
        const usuarioLogado = JSON.parse(dadosUsuarioLogado);
        const linkConta = document.querySelector('a[href="login.html"]');
        
        if (linkConta) {
            linkConta.textContent = `Olá, ${usuarioLogado.usuario}`;
            // MUDANÇA: Direciona para o perfil, e não mais para "#"
            linkConta.href = "perfil.html"; 

            // ... (código que adiciona o botão "Sair") ...
            const li = linkConta.parentElement;
            const navUl = li.parentElement;

            // Evita adicionar "Sair" várias vezes
            if (!document.getElementById("logout")) {
                const logoutLi = document.createElement("li");
                logoutLi.innerHTML = '<a href="#" id="logout">Sair</a>';
                navUl.appendChild(logoutLi);

                document.getElementById("logout").addEventListener("click", function(e) {
                    e.preventDefault();
                    sessionStorage.removeItem("usuarioLogado");
                    window.location.reload();
                });
            }
        }
    }

    // =======================================================
    // 2. LÓGICA DO SLIDER E MENU 
    // =======================================================

    const slides = document.querySelectorAll(".slide");
    const dotContainer = document.querySelector(".dots");
    // ATENÇÃO: Suas setas no HTML têm as classes "left" e "right"
    const left = document.querySelector(".slider-arrow.left"); 
    const right = document.querySelector(".slider-arrow.right");
    const navbar = document.querySelector(".navbar");
    const menuBttn = document.querySelector(".menu-bttn");

    // Se não houver slides, não execute a lógica do slider
    if (slides.length > 0 && dotContainer && left && right) {
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
        createDots();
        goToSlide(currentSlide);
        activeDot(currentSlide);

        // --- Event Listeners do Slider ---
        left.addEventListener("click", prevSlide);
        right.addEventListener("click", nextSlide);
        
        dotContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("dots_dot")) {
                const slide = Number(e.target.dataset.slide);
                goToSlide(slide);
                activeDot(slide);
                currentSlide = slide;
            }
        });

        // Auto-play (Opcional)
        setInterval(nextSlide, 7000); // Muda a cada 7 segundos
    }

    // --- Lógica do Menu Mobile ---
    if (menuBttn && navbar) {
        menuBttn.addEventListener("click", () => {
            navbar.classList.toggle("show-menu");
        });
    }

    // =======================================================
    // 3. LÓGICA DOS FAVORITOS NA HOME
    // =======================================================
    
    const container = document.getElementById("favoritos-home-container");

    if (container) {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const quatroFavoritos = favoritos.slice(0, 4);

        if (quatroFavoritos.length === 0) {
            container.innerHTML = "<p>Nenhum produto favoritado ainda.</p>";
        } else {
            // Limpa o container antes de adicionar (boa prática)
            container.innerHTML = ""; 
            quatroFavoritos.forEach(produto => {
                // (Mantido com innerHTML como solicitado)
                container.innerHTML += `
                    <div class="product-card" onclick="window.location.href='produto.html?id=${produto.id}'">
                        <img src="${produto.imagem}">
                        <h3>${produto.nome}</h3>
                    </div>
                `;
            });
        }
    }

// =======================================================
    // 4. LÓGICA DA BARRA DE PESQUISA (AGORA COMPLETA)
    // =======================================================
    
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results'); // Onde os resultados aparecem

    if (searchToggle && searchContainer && searchInput && searchResultsContainer) {
        
        // Evento para ABRIR/FECHAR ao clicar na LUPA
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            searchContainer.classList.toggle('active');
            
            if (searchContainer.classList.contains('active')) {
                setTimeout(() => searchInput.focus(), 100);
            } else {
                // Limpa os resultados ao fechar
                searchResultsContainer.innerHTML = ''; 
                searchInput.value = '';
            }
        });

        // Evento para NÃO FECHAR ao clicar dentro da barra
       // Seleciona os "filhos" da barra de pesquisa
const searchInputWrapper = document.querySelector('.search-input-wrapper');
const searchResults = document.getElementById('search-results');

// Evento para NÃO FECHAR ao clicar DENTRO do conteúdo da busca
if (searchInputWrapper) {
    searchInputWrapper.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede o clique de fechar o modal
    });
}
if (searchResults) {
    searchResults.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede o clique de fechar o modal
    });
}

        // ===================================
        // NOVA LÓGICA DE BUSCA (Adicione isso)
        // ===================================
        
        // Escuta o que o usuário digita
      // Dentro do JS/script.js

searchInput.addEventListener('keyup', () => {
    const termo = searchInput.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');

    if (termo === '') {
        resultsContainer.innerHTML = '';
        return; 
    }

    // 1. Pesquisa nos Produtos Estáticos (do database.js)
    const resultadosEstaticos = TODOS_OS_PRODUTOS.filter(produto => 
        produto.nome.toLowerCase().includes(termo)
    );

    // 2. Pesquisa nos Produtos Dinâmicos (do localStorage)
    const produtosDinamicos = JSON.parse(localStorage.getItem("produtos")) || [];
    const resultadosDinamicos = produtosDinamicos.filter(produto => 
        produto.nome.toLowerCase().includes(termo)
    );

    // 3. Combina os resultados
    resultsContainer.innerHTML = '';

    if (resultadosEstaticos.length === 0 && resultadosDinamicos.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item no-results">Nenhum resultado encontrado.</div>';
        return;
    }

    // 4. Exibe resultados estáticos
    resultadosEstaticos.forEach(produto => {
        resultsContainer.innerHTML += `
            <a href="${produto.pagina}" class="search-result-item">
                (Loja) ${produto.nome}
            </a>
        `;
    });

    // 5. Exibe resultados dinâmicos (anúncios)
    resultadosDinamicos.forEach(produto => {
        resultsContainer.innerHTML += `
            <a href="anuncio.html?id=${produto.id}" class="search-result-item">
                (Anúncio) ${produto.nome}
            </a>
        `;
    });
});
    }

    /**
     * Função que desenha os resultados na tela
     */
    function exibirResultados(resultados) {
        // Limpa a lista anterior
        searchResultsContainer.innerHTML = '';

        if (resultados.length === 0) {
            searchResultsContainer.innerHTML = '<div class="search-result-item no-results">Nenhum resultado encontrado.</div>';
            return;
        }

        // Cria um item para cada resultado (limita a 5 para não quebrar o layout)
        resultados.slice(0, 5).forEach(produto => {
            // Cria um link seguro (sem innerHTML)
            const link = document.createElement('a');
            link.href = produto.pagina;
            link.className = 'search-result-item'; 
            link.textContent = produto.nome; 
            
            searchResultsContainer.appendChild(link);
        });
    }


    // =======================================================
    // 5. LÓGICA PARA FECHAR PESQUISA AO "CLICAR FORA"
    // =======================================================
    
    // Escuta cliques no documento inteiro
    document.addEventListener('click', () => {
        if (searchContainer && searchContainer.classList.contains('active')) {
            searchContainer.classList.remove('active');
            
            // Limpa os resultados ao fechar
            searchResultsContainer.innerHTML = ''; 
            searchInput.value = '';
        }
    });

});