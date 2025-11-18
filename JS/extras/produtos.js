// Quando todo o conteúdo da página terminar de carregar, este código começa a rodar.
document.addEventListener("DOMContentLoaded", () => {
    
    // Pega o elemento onde os produtos serão exibidos.
    const productList = document.getElementById("product-list");

    // Se esse elemento não existir na página, não há porque continuar.
    if (!productList) return;

    // Busca no localStorage todos os produtos que já foram cadastrados.
    // Caso não exista nada, usamos um array vazio como padrão.
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Se não houver nenhum produto salvo, mostramos uma mensagem na tela.
    if (produtos.length === 0) {
        productList.innerHTML = "<p>Nenhum produto anunciado ainda.</p>";
        return;
    }

    // Limpamos o conteúdo atual da lista antes de adicionar os produtos.
    productList.innerHTML = ""; 

    // Para cada produto salvo no localStorage, criamos um card exibindo suas informações.
    produtos.forEach(produto => {


        // Cada produto é clicável e direciona para a página anuncio.html,
        // onde ele será carregado pelo ID que está sendo passado na URL (?id=...).

        productList.innerHTML += `
            <div classa="produto-card">
                <!-- O link leva para a página de detalhes do produto via ID -->
                <a href="anuncio.html?id=${produto.id}">
                    <!-- Imagem do produto -->
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    
                    <!-- Nome do produto -->
                    <h3>${produto.nome}</h3>

                    <!-- Categoria -->
                    <p class="cat">${produto.categoria}</p>

                    <!-- Preço formatado com duas casas decimais -->
                    <p class="price">R$ ${produto.preco.toFixed(2)}</p>

                    <!-- Nome do anunciante, se existir -->
                    ${produto.anunciante ? `<p class="anunciante">Por: ${produto.anunciante}</p>` : ''}
                </a>
            </div>
        `;
    });
});
