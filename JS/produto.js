// Trocar imagem principal ao clicar nas thumbnails
document.querySelectorAll(".thumbnail-item img").forEach(img => {
    
    // Para cada miniatura, adicionamos um evento de clique
    img.addEventListener("click", function () {
        
        // Quando a miniatura é clicada, trocamos a imagem principal pelo src da thumbnail
        document.getElementById("main-product-image").src = this.src;

        // Remove a classe "active" de todas as miniaturas (tira destaque delas)
        document.querySelectorAll(".thumbnail-item").forEach(item => item.classList.remove("active"));

        // Adiciona a classe "active" somente na miniatura que foi clicada
        this.parentElement.classList.add("active");
    });

});
// Tabs Descrição / Especificações
document.querySelectorAll(".description-tabs ul li a").forEach(link => {
    
    // Para cada aba (link dentro da lista), adicionamos um evento de clique
    link.addEventListener("click", function (e) {

        // Impede o comportamento padrão do link (que seria rolar a página)
        e.preventDefault();

        // Remove a classe "active" de todas as abas
        document.querySelectorAll(".description-tabs li").forEach(li => li.classList.remove("active"));

        // Marca a aba clicada como ativa
        this.parentElement.classList.add("active");

        // Pega o valor do atributo href (ex.: "#descricao" ou "#especificacoes")
        const target = this.getAttribute("href");

        // Esconde todo o conteúdo de descrição (todas as seções)
        document.querySelectorAll(".description-content").forEach(sec => sec.style.display = "none");

        // Mostra apenas a seção correspondente à aba clicada
        document.querySelector(target).style.display = "block";
    });

});
