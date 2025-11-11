document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.querySelector('input[placeholder="Email"]').value;
  const usuario = document.querySelector('input[placeholder="Usuário"]').value;
  const senha = document.querySelector('input[placeholder="Senha"]').value;
  const confirma = document.querySelector('input[placeholder="Confirme sua senha"]').value;
  const telefone = document.querySelector('input[placeholder="Telefone"]').value;

  if (!email || !usuario || !senha || !confirma || !telefone) {
    alert("Preencha todos os campos!");
    return;
  }
  if (senha !== confirma) {
    alert("As senhas não conferem!");
    return;
  }

  // Simulação do cadastro
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html"; // Redireciona para tela de login
});
