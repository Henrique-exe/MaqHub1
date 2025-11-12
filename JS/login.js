// JS/login.js (ou similar)

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede envio do formulário padrão

  // Usando os seletores do seu script original de login
  const usuarioEmail = document.querySelector('input[type="email"]').value;
  const senha = document.querySelector('input[type="password"]').value;

  if (usuarioEmail === "" || senha === "") {
    alert("Preencha todos os campos.");
    return;
  }

  // --- Início da Lógica de Verificação ---

  // 1. Puxa a lista de usuários do localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // 2. Procura por um usuário que tenha O MESMO email E A MESMA senha
  const usuarioEncontrado = usuarios.find(u => u.email === usuarioEmail && u.senha === senha);

  // 3. Verificação
  if (usuarioEncontrado) {
    // Sucesso!
    alert("Login realizado com sucesso!");

    // Opcional, mas recomendado:
    // Salva o usuário logado na "sessão" do navegador.
    // Isso permite que a "index.html" saiba quem está logado.
    // sessionStorage é limpo quando o navegador fecha.
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    window.location.href = "index.html"; // Redireciona para a página principal
  } else {
    // Falha!
    alert("Usuário ou senha inválidos!");
  }
  // --- Fim da Lógica de Verificação ---
});