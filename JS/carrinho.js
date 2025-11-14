document.addEventListener("DOMContentLoaded", () => {

    const cart = JSON.parse(localStorage.getItem("carrinho")) || [];

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function atualizarCarrinho() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((produto, index) => {
            total += produto.preco;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${produto.imagem}">
                    <div>
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remover</button>
                </div>
            `;
        });

        cartTotal.textContent = total.toFixed(2);

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
