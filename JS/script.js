  document.addEventListener("DOMContentLoaded", function() {

    const dadosUsuarioLogado = sessionStorage.getItem("usuarioLogado");

    if (dadosUsuarioLogado) {
      const usuarioLogado = JSON.parse(dadosUsuarioLogado);
      const linkConta = document.querySelector('a[href="login.html"]');

      if (linkConta) {
        linkConta.textContent = `Olá, ${usuarioLogado.usuario}`;
        linkConta.href = "perfil.html";

        const li = linkConta.parentElement;
        const navUl = li.parentElement;

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

    const slides = document.querySelectorAll(".slide");
    const dotContainer = document.querySelector(".dots");
    const left = document.querySelector(".slider-arrow.left");
    const right = document.querySelector(".slider-arrow.right");
    const navbar = document.querySelector(".navbar");
    const menuBttn = document.querySelector(".menu-bttn");

    if (slides.length > 0 && dotContainer && left && right) {
      let currentSlide = 0;
      const maxSlide = slides.length;

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

      createDots();
      goToSlide(currentSlide);
      activeDot(currentSlide);

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

      setInterval(nextSlide, 7000);
    }

    if (menuBttn && navbar) {
      menuBttn.addEventListener("click", () => {
        navbar.classList.toggle("show-menu");
      });
    }

    //FAVORITOS//

    const container = document.getElementById("favoritos-home-container");

    if (container) {
      const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      const quatroFavoritos = favoritos.slice(0, 4);

      if (quatroFavoritos.length === 0) {
        container.innerHTML = "<p>Nenhum produto favoritado ainda.</p>";
      } else {
        container.innerHTML = "";
        quatroFavoritos.forEach(produto => {
          container.innerHTML += `
                      <div class="product-card" onclick="window.location.href='produto.html?id=${produto.id}'">
                          <img src="${produto.imagem}">
                          <h3>${produto.nome}</h3>
                      </div>
                  `;
        });
      }
    }

    //BARRA DE PESQUISA// 

    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');

    if (searchToggle && searchContainer && searchInput && searchResultsContainer) {
      searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        searchContainer.classList.toggle('active');

        if (searchContainer.classList.contains('active')) {
          setTimeout(() => searchInput.focus(), 100);
        } else {
          searchResultsContainer.innerHTML = '';
          searchInput.value = '';
        }
      });

      const searchInputWrapper = document.querySelector('.search-input-wrapper');
      const searchResults = document.getElementById('search-results');

      if (searchInputWrapper) {
        searchInputWrapper.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }
      if (searchResults) {
        searchResults.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }

      searchInput.addEventListener('keyup', () => {
        const termo = searchInput.value.toLowerCase().trim();
        const resultsContainer = document.getElementById('search-results');

        if (termo === '') {
          resultsContainer.innerHTML = '';
          return;
        }

        const resultadosEstaticos = TODOS_OS_PRODUTOS.filter(produto =>
          produto.nome.toLowerCase().includes(termo)
        );

        const produtosDinamicos = JSON.parse(localStorage.getItem("produtos")) || [];
        const resultadosDinamicos = produtosDinamicos.filter(produto =>
          produto.nome.toLowerCase().includes(termo)
        );

        resultsContainer.innerHTML = '';

        if (resultadosEstaticos.length === 0 && resultadosDinamicos.length === 0) {
          resultsContainer.innerHTML = '<div class="search-result-item no-results">Nenhum resultado encontrado.</div>';
          return;
        }

        resultadosEstaticos.forEach(produto => {
          resultsContainer.innerHTML += `
              <a href="${produto.pagina}" class="search-result-item">
                  (Loja) ${produto.nome}
              </a>
          `;
        });

        resultadosDinamicos.forEach(produto => {
          resultsContainer.innerHTML += `
              <a href="anuncio.html?id=${produto.id}" class="search-result-item">
                  (Anúncio) ${produto.nome}
              </a>
          `;
        });
      });
    }

    function exibirResultados(resultados) {
      searchResultsContainer.innerHTML = '';

      if (resultados.length === 0) {
        searchResultsContainer.innerHTML = '<div class="search-result-item no-results">Nenhum resultado encontrado.</div>';
        return;
      }

      resultados.slice(0, 5).forEach(produto => {
        const link = document.createElement('a');
        link.href = produto.pagina;
        link.className = 'search-result-item';
        link.textContent = produto.nome;

        searchResultsContainer.appendChild(link);
      });
    }

    document.addEventListener('click', () => {
      if (searchContainer && searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('active');
        searchResultsContainer.innerHTML = '';
        searchInput.value = '';
      }
    });

  });