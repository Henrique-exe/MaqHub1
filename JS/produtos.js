
document.addEventListener("DOMContentLoaded", () => {
    
    const productList = document.getElementById("product-list");
    if (!productList) return;

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    if (produtos.length === 0) {
        productList.innerHTML = "<p>Nenhum produto anunciado ainda.</p>";
        return;
    }

    productList.innerHTML = ""; 

    produtos.forEach(produto => {

        productList.innerHTML += `
            <div classa="produto-card">
                <a href="anuncio.html?id=${produto.id}">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p class="cat">${produto.categoria}</p>
                    <p class="price">R$ ${produto.preco.toFixed(2)}</p>
                    ${produto.anunciante ? `<p class="anunciante">Por: ${produto.anunciante}</p>` : ''}
                </a>
            </div>
        `;
    });
});
