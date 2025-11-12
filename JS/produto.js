// JS/produto.js
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA GALERIA DE IMAGENS ---
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-item');

    if (mainImage && thumbnails) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // 1. Remove 'active' de todos os thumbnails
                thumbnails.forEach(item => item.classList.remove('active'));
                
                // 2. Adiciona 'active' ao thumbnail clicado
                thumb.classList.add('active');
                
                // 3. Troca a imagem principal
                // Pega o 'src' da imagem *dentro* do thumbnail clicado
                const newImageSrc = thumb.querySelector('img').getAttribute('src');
                
                // (Opcional: troca o 'src' do thumb pelo da imagem principal para ficar mais realista)
                // Ex: "img/Product7-thumb1.jpg" -> "img/Product7-removebg-preview.png"
                // Para este exemplo, vou assumir que o thumb-1 é a imagem principal
                // Em um caso real, você pode precisar de um 'data-main-src' no thumb
                
                // No nosso caso, vamos apenas trocar a imagem principal pela imagem do thumb
                // NOTA: Para funcionar 100%, os thumbs devem ter imagens diferentes da principal
                mainImage.setAttribute('src', newImageSrc);
            });
        });
    }

    // --- LÓGICA DAS ABAS DE DESCRIÇÃO ---
    const tabLinks = document.querySelectorAll('.description-tabs li');
    const tabContents = document.querySelectorAll('.description-content');

    if (tabLinks && tabContents) {
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Impede o link de pular a página

                // 1. Remove 'active' de todas as abas
                tabLinks.forEach(item => item.classList.remove('active'));

                // 2. Adiciona 'active' à aba clicada
                link.classList.add('active');

                // 3. Esconde todos os conteúdos
                tabContents.forEach(content => content.style.display = 'none');

                // 4. Mostra o conteúdo correspondente
                // Pega o 'href' (ex: #descricao)
                const targetId = link.querySelector('a').getAttribute('href'); 
                const targetContent = document.querySelector(targetId);
                
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            });
        });
    }
});