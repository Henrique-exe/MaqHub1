// ------------------ ADICIONAR AO CARRINHO ----------------------

function adicionarAoCarrinho(produto) {

    // Busca o carrinho salvo no localStorage ou cria um array vazio caso não exista
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já existe no carrinho pelo ID
    const existente = carrinho.find(item => item.id === produto.id);

    // Se o produto já estiver no carrinho, apenas aumenta a quantidade
    if (existente) {
        existente.quantidade++;
    } 
    // Caso contrário, adiciona o produto como um novo item no carrinho
    else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1 // quantidade inicial
        });
    }

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Exibe mensagem ao usuário
    alert("Produto adicionado ao carrinho!");
}



// ------------------ EXIBIR CARRINHO EM PÁGINA PRÓPRIA ----------------------

document.addEventListener("DOMContentLoaded", () => {

    // Recupera o carrinho salvo no localStorage ou cria um carrinho vazio
    const cart = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Seleciona elementos do HTML onde os itens e o total serão exibidos
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Se não estiver na página do carrinho, evita erro e encerra o script
    if (!cartItems || !cartTotal) return;

    // Função responsável por desenhar o carrinho na tela
    function atualizarCarrinho() {

        // Limpa o conteúdo atual da lista de itens
        cartItems.innerHTML = "";
        let total = 0; // variável para somar o total

        // Percorre todos os produtos do carrinho
        cart.forEach((produto, index) => {

            // Soma o valor do produto multiplicado pela quantidade
            total += produto.preco * produto.quantidade;

            // Adiciona o item visualmente ao HTML
            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${produto.imagem}">
                    <div>
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.preco.toFixed(2)} x ${produto.quantidade}</p>
                    </div>
                    <!-- Botão para remover item, com index para identificar qual remover -->
                    <button class="remove-btn" data-index="${index}">Remover</button>
                </div>
            `;
        });

        // Atualiza o valor total na tela
        cartTotal.textContent = total.toFixed(2);

        // Seleciona todos os botões de remover
        document.querySelectorAll(".remove-btn").forEach(btn => {

            // Ao clicar no botão de remover
            btn.addEventListener("click", () => {

                // Pega o índice do produto diretamente do atributo data-index
                const index = btn.getAttribute("data-index");

                // Remove o item da lista pelo índice
                cart.splice(index, 1);

                // Atualiza o localStorage com o carrinho modificado
                localStorage.setItem("carrinho", JSON.stringify(cart));

                // Re-renderiza a lista do carrinho
                atualizarCarrinho();
            });
        });
    }

    // Chama a função ao carregar a página para mostrar o carrinho
    atualizarCarrinho();
});
