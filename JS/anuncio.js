document.addEventListener("DOMContentLoaded", () => {
    // Pega o ID do produto no URL (ex: ?id=user_12345)
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    if (!produtoId) {
        document.body.innerHTML = "<h1>Produto não encontrado.</h1>";
        return;
    }

    // Carrega a lista de produtos do localStorage
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    
    // Encontra o produto específico pelo ID
    const produto = produtos.find(p => p.id === produtoId);

    if (!produto) {
        document.body.innerHTML = "<h1>Produto não encontrado.</h1>";
        return;
    }

    // --- Preenche a Página com os Dados do Produto ---

    document.title = `${produto.nome} - MaqHub`;
    document.getElementById("main-product-image").src = produto.imagem;
    document.getElementById("main-product-image").alt = produto.nome;
    document.getElementById("product-name").textContent = produto.nome;
    document.getElementById("product-seller").textContent = `Anunciado por: ${produto.anunciante || 'Admin'}`;
    
    if (produto.preco > 0) {
        document.getElementById("product-price").textContent = `R$ ${produto.preco.toFixed(2)}`;
    } else {
        document.getElementById("product-price").textContent = "Preço a combinar";
    }

    document.getElementById("product-description").innerHTML = `<p>${produto.descricao}</p>`;
    document.getElementById("descricao").style.display = "block";

    // --- Adiciona funcionalidade aos botões ---

    // (O 'produto.js' não serve aqui, pois ele é para os estáticos)
    
    // Adicionar ao Carrinho
    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
        adicionarAoCarrinho(produto); // Função do carrinho.js
    });

    // Adicionar aos Favoritos
    document.getElementById("add-to-fav-btn").addEventListener("click", () => {
        adicionarFavorito(produto); // Função do favoritos-home.js
        alert("Adicionado/Removido dos favoritos!");
    });
});