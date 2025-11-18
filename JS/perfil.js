document.addEventListener("DOMContentLoaded", () => {
 
    const dadosUsuario = sessionStorage.getItem("usuarioLogado");
    if (!dadosUsuario) {
        alert("Você precisa estar logado para ver esta página.");
        window.location.href = "login.html";
        return;
    }

    const usuarioLogado = JSON.parse(dadosUsuario);


    const elUsuario = document.getElementById("user-usuario");
    const elEmail = document.getElementById("user-email");
    const elTelefone = document.getElementById("user-telefone");

    if (elUsuario) elUsuario.textContent = usuarioLogado.usuario || usuarioLogado.nome || "Usuário";
    if (elEmail) elEmail.textContent = usuarioLogado.email || "—";
    if (elTelefone) elTelefone.textContent = usuarioLogado.telefone || "—";

    const form = document.getElementById("product-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const categoria = document.getElementById("categoria").value.trim();
        const preco = Number(document.getElementById("preco").value) || 0;
        const imagemInput = document.getElementById("imagem");
        const descricao = document.getElementById("descricao").value.trim();

        if (!nome || !categoria || !imagemInput.files.length || !descricao) {
            alert("Preencha todos os campos.");
            return;
        }

        const file = imagemInput.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const imagemDataUrl = reader.result;

     
            const id = `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

            const novoProduto = {
                id,
                nome,
                categoria,
                preco,
                imagem: imagemDataUrl,
                descricao,
                anunciante: usuarioLogado.usuario || usuarioLogado.email || "Anunciante",
                criadoEm: new Date().toISOString()
            };

            const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
            produtos.unshift(novoProduto);
            localStorage.setItem("produtos", JSON.stringify(produtos));

            alert("Anúncio publicado com sucesso!");
            form.reset();
           
        };
        reader.readAsDataURL(file);
    });
});