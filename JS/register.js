// JS/register.js

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.querySelector('input[placeholder="Email"]').value;
  const usuario = document.querySelector('input[placeholder="Usuário"]').value;
  const senha = document.querySelector('input[placeholder="Senha"]').value;
  const confirma = document.querySelector('input[placeholder="Confirme sua senha"]').value;
  const telefone = document.querySelector('input[placeholder="Telefone"]').value;
  


 
  if (!email || !usuario || !senha || !confirma || !telefone ) {
    alert("Preencha todos os campos!");
    return;
  }
  

  if (senha !== confirma) {
    alert("As senhas não conferem!");
    return;
  }


  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


  const emailExistente = usuarios.find(u => u.email === email);
  if (emailExistente) {
    alert("Este email já está cadastrado!");
    return;
  }

  
  const novoUsuario = {
    email: email,
    usuario: usuario,
    senha: senha, 
    telefone: telefone,
  
  };


  usuarios.push(novoUsuario);


  localStorage.setItem("usuarios", JSON.stringify(usuarios));

 

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html"; 
});