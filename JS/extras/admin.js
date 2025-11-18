document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("product-form");
    const productList = document.getElementById("product-list");

    function carregarProdutos() {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

        productList.innerHTML = "";

        produtos.forEach(produto => {
            productList.innerHTML += `
                <div class="produto-card">
                    <img src="${produto.imagem}">
                    <h3>${produto.nome}</h3>
                    <p>${produto.categoria}</p>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                </div>
            `;
        });
    }

    carregarProdutos();

    form.addEventListener("submit", e => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const categoria = document.getElementById("categoria").value;
        const preco = Number(document.getElementById("preco").value);
        const imagem = document.getElementById("imagem").value;
        const descricao = document.getElementById("descricao").value;

        const novoProduto = { nome, categoria, preco, imagem, descricao };

        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.push(novoProduto);

        localStorage.setItem("produtos", JSON.stringify(produtos));

        alert("Produto cadastrado!");

        form.reset();
        carregarProdutos();
    });

});
