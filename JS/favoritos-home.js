/* ==============================================
   FUNÇÃO PRINCIPAL DE FAVORITOS (USADA EM TODO O SITE)
   ============================================== */

/**
 * Adiciona ou remove um produto dos favoritos no localStorage.
 * @param {object} produto - O objeto do produto (deve ter id, nome, imagem)
 */
function adicionarFavorito(produto) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Verifica se o produto já existe
    const existe = favoritos.find(item => item.id === produto.id);

    if (existe) {
        // Se existe, remove (filtra a lista)
        favoritos = favoritos.filter(item => item.id !== produto.id);
        // alert("Produto removido dos favoritos."); // Opcional
    } else {
        // Se não existe, adiciona
        favoritos.push({
            id: produto.id,
            nome: produto.nome,
            imagem: produto.imagem
        });
        // alert("Adicionado aos favoritos!"); // Opcional
    }

    // Salva a lista atualizada no localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // ** ATUALIZAÇÃO IMPORTANTE **
    // Se a função 'exibirFavoritos' existir (ou seja, se estivermos na página de favoritos),
    // ela será chamada para atualizar a tela instantaneamente.
    if (typeof exibirFavoritos === 'function') {
        exibirFavoritos();
    }
}


/* ==============================================
   CÓDIGO DA PÁGINA DE FAVORITOS (favoritos.html)
   ============================================== */

/**
 * Lê o localStorage e exibe os cards de favoritos na tela.
 */
function exibirFavoritos() {
    // Pega o contêiner da grade (do seu HTML original)
    const grid = document.getElementById("favoritos-grid");
    
    // Se o elemento não existir, não faz nada (evita erros em outras páginas)
    if (!grid) return;

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Limpa a grade antes de adicionar os itens
    grid.innerHTML = "";

    // Verifica se há favoritos
    if (favoritos.length === 0) {
        grid.innerHTML = "<p class='empty-message'>Nenhum produto favoritado.</p>";
        return;
    }

    // Cria um card para cada favorito
    favoritos.forEach(produto => {
        // CORREÇÃO: Precisamos converter o objeto 'produto' em uma string JSON
        // para passá-lo corretamente para a função onclick no HTML.
        // Usamos .replace(/"/g, '&quot;') para escapar das aspas duplas.
        const produtoString = JSON.stringify(produto).replace(/"/g, '&quot;');

        grid.innerHTML += `
            <div class="fav-card">
                
                <div class="fav-card-clickable" onclick="window.location.href='produto.html?id=${produto.id}'">
                    <img src="${produto.imagem}">
                    <h3>${produto.nome}</h3>
                </div>

                <button class="fav-remove-btn" onclick="adicionarFavorito(${produtoString})">
                    Remover
                </button>
            </div>
        `;
    });
}

// Quando o HTML da página de favoritos terminar de carregar,
// chama a função para exibir os itens.
document.addEventListener("DOMContentLoaded", () => {
    exibirFavoritos();
});

