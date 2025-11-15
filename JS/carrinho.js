// ------------------ ADICIONAR AO CARRINHO ----------------------

function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const existente = carrinho.find(item => item.id === produto.id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
}


// ------------------ EXIBIR CARRINHO EM PÁGINA PRÓPRIA ----------------------

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("carrinho")) || [];

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return; // evita erros se não estiver na página do carrinho

    function atualizarCarrinho() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((produto, index) => {
            total += produto.preco * produto.quantidade;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${produto.imagem}">
                    <div>
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.preco.toFixed(2)} x ${produto.quantidade}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remover</button>
                </div>
            `;
        });

        cartTotal.textContent = total.toFixed(2);

        // Remover item
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("carrinho", JSON.stringify(cart));
                atualizarCarrinho();
            });
        });
    }

    atualizarCarrinho();
});
