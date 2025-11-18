

/**
 * Adiciona ou remove um produto dos favoritos no localStorage.
  @param {object} produto - O objeto do produto (deve ter id, nome, imagem)
 */



function adicionarFavorito(produto) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


    const existe = favoritos.find(item => item.id === produto.id);

    if (existe) {
       
        favoritos = favoritos.filter(item => item.id !== produto.id);
   
    } else {
   
        favoritos.push({
            id: produto.id,
            nome: produto.nome,
            imagem: produto.imagem
        });
    
    }


    localStorage.setItem("favoritos", JSON.stringify(favoritos));


    if (typeof exibirFavoritos === 'function') {
        exibirFavoritos();
    }
}



function exibirFavoritos() {
  
    const grid = document.getElementById("favoritos-grid");
    

    if (!grid) return;

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

 
    grid.innerHTML = "";

  
    if (favoritos.length === 0) {
        grid.innerHTML = "<p class='empty-message'>Nenhum produto favoritado.</p>";
        return;
    }


    favoritos.forEach(produto => {

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

document.addEventListener("DOMContentLoaded", () => {
    exibirFavoritos();
});

