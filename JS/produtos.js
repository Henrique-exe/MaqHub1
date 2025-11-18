// JS/produtos.js (Versão Atualizada)

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
        // ***** MUDANÇA PRINCIPAL AQUI *****
        // Criamos um link que leva à nossa página de template, passando o ID
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
//Nota: Para os cartões (.produto-card) ficarem iguais aos da index.html, copie os estilos de .product e .cols-4 do Globals.css e aplique-os ao .produto-card e #product-list.