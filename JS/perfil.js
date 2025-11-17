document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CARREGAR DADOS DO USUÁRIO ---
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        // Se não estiver logado, chuta de volta pro login
        alert("Você precisa estar logado para ver esta página.");
        window.location.href = "login.html";
        return;
    }

    // Preenche os campos "Meus Dados"
    document.getElementById("user-usuario").textContent = usuarioLogado.usuario;
    document.getElementById("user-email").textContent = usuarioLogado.email;
    document.getElementById("user-telefone").textContent = usuarioLogado.telefone || "Não informado";

    
    // --- 2. LÓGICA DO FORMULÁRIO DE ANÚNCIO ---
    const form = document.getElementById("product-form");

    form.addEventListener("submit", e => {
        e.preventDefault();

        // Pega os dados do formulário
        const nome = document.getElementById("nome").value;
        const categoria = document.getElementById("categoria").value;
        const preco = Number(document.getElementById("preco").value);
        const imagem = document.getElementById("imagem").value;
        const descricao = document.getElementById("descricao").value;

        // Cria o objeto do novo produto
        const novoProduto = { 
            nome, 
            categoria, 
            preco, 
            imagem, 
            descricao,
            // Adiciona quem foi o anunciante!
            anunciante: usuarioLogado.usuario 
        };

        // Puxa a lista de produtos existente (a mesma do admin!)
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        
        // Adiciona o novo produto na lista
        produtos.push(novoProduto);

        // Salva a lista atualizada de volta no localStorage
        localStorage.setItem("produtos", JSON.stringify(produtos));

        alert("Seu anúncio foi publicado com sucesso!");

        form.reset(); // Limpa o formulário
    });

});