// JS/register.js

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.querySelector('input[placeholder="Email"]').value;
  const usuario = document.querySelector('input[placeholder="Usuário"]').value;
  const senha = document.querySelector('input[placeholder="Senha"]').value;
  const confirma = document.querySelector('input[placeholder="Confirme sua senha"]').value;
  const telefone = document.querySelector('input[placeholder="Telefone"]').value;
  
  // Adicionando a captura do gênero, que faltou no seu script original
  const genero = document.querySelector('input[name="genero"]:checked');

  // Validação de campos vazios (incluindo gênero)
  if (!email || !usuario || !senha || !confirma || !telefone || !genero) {
    alert("Preencha todos os campos!");
    return;
  }
  
  // Validação de senhas
  if (senha !== confirma) {
    alert("As senhas não conferem!");
    return;
  }

  // --- Início da Lógica de Armazenamento Local ---

  // 1. Puxa a lista de usuários já cadastrados do localStorage. 
  // Se não existir (||), cria um array vazio [].
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // 2. Verifica se o email já está em uso
  const emailExistente = usuarios.find(u => u.email === email);
  if (emailExistente) {
    alert("Este email já está cadastrado!");
    return;
  }

  // 3. Cria o objeto do novo usuário
  const novoUsuario = {
    email: email,
    usuario: usuario,
    senha: senha, // ATENÇÃO: Armazenar senhas assim não é seguro para produção!
    telefone: telefone,
    genero: genero.id // Salva o ID (male, feminino, outro)
  };

  // 4. Adiciona o novo usuário ao array
  usuarios.push(novoUsuario);

  // 5. Salva o array atualizado de volta no localStorage
  // JSON.stringify converte o array de objetos em texto para ser salvo
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // --- Fim da Lógica de Armazenamento Local ---

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html"; // Redireciona para tela de login
});