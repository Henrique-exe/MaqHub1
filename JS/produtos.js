document.addEventListener("DOMContentLoaded", () => {
    
    const productList = document.getElementById("product-list");

    if (!productList) return;

    // Carrega TODOS os produtos salvos
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    if (produtos.length === 0) {
        productList.innerHTML = "<p>Nenhum produto anunciado ainda.</p>";
        return;
    }

    productList.innerHTML = ""; // Limpa a lista

    // Cria um card para cada produto
    produtos.forEach(produto => {
        // (Usei innerHTML por simplicidade, como no seu admin.js)
        productList.innerHTML += `
            <div class="produto-card">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="cat">${produto.categoria}</p>
                <p class="price">R$ ${produto.preco.toFixed(2)}</p>
                
                ${produto.anunciante ? `<p class="anunciante">Por: ${produto.anunciante}</p>` : ''}
            </div>
        `;
    });
});

// CSS Opcional para o card (em admin.css ou Globals.css)
/* .produto-card .cat { font-size: 0.9rem; color: #777; }
.produto-card .price { font-weight: 600; font-size: 1.1rem; color: #000; }
.produto-card .anunciante { font-size: 0.8rem; color: #555; margin-top: 5px; }
*/