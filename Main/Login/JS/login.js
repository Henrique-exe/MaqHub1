document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede envio do formulário padrão
  const usuario = document.querySelector('input[type="email"]').value;
  const senha = document.querySelector('input[type="password"]').value;

  if (usuario === "" || senha === "") {
    alert("Preencha todos os campos.");
    return;
  }

  // Simulação de verificação de usuário
  if (usuario === "usuario@dominio.com" && senha === "123456") {
    alert("Login realizado com sucesso!");
    window.location.href = "index.html"; // Redireciona para a página principal
  } else {
    alert("Usuário ou senha inválidos!");
  }
});
