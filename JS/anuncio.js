document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    if (!produtoId) {
        document.body.innerHTML = "<h1>Produto não encontrado.</h1>";
        return;
    }

 
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    

    const produto = produtos.find(p => p.id === produtoId);

    if (!produto) {
        document.body.innerHTML = "<h1>Produto não encontrado.</h1>";
        return;
    }



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


    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
        adicionarAoCarrinho(produto); 
    });

   
    document.getElementById("add-to-fav-btn").addEventListener("click", () => {
        adicionarFavorito(produto);
        alert("Adicionado/Removido dos favoritos!");
    });
});