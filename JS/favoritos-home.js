// ------------------ FAVORITAR PRODUTO ----------------------

function adicionarFavorito(produto) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const existe = favoritos.find(item => item.id === produto.id);

    if (existe) {
        favoritos = favoritos.filter(item => item.id !== produto.id);
        alert("Produto removido dos favoritos.");
    } else {
        favoritos.push({
            id: produto.id,
            nome: produto.nome,
            imagem: produto.imagem
        });
        alert("Adicionado aos favoritos!");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


// ------------------ EXIBIR FAVORITOS EM PÁGINA PRÓPRIA ----------------------

document.addEventListener("DOMContentLoaded", () => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];

    const favArea = document.getElementById("favorito-items");

    if (!favArea) return; // evita erros se não estiver na página de favoritos

    favArea.innerHTML = "";

    favs.forEach(item => {
        favArea.innerHTML += `
            <div class="fav-item">
                <img src="${item.imagem}">
                <h3>${item.nome}</h3>
                <button onclick="adicionarFavorito({id: '${item.id}', nome: '${item.nome}', imagem: '${item.imagem}'})">
                    Remover
                </button>
            </div>
        `;
    });
});
