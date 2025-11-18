
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); 


  const usuarioEmail = document.querySelector('input[type="email"]').value;
  const senha = document.querySelector('input[type="password"]').value;

  if (usuarioEmail === "" || senha === "") {
    alert("Preencha todos os campos.");
    return;
  }


  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


  const usuarioEncontrado = usuarios.find(u => u.email === usuarioEmail && u.senha === senha);


  if (usuarioEncontrado) {

    alert("Login realizado com sucesso!");


    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    window.location.href = "index.html"; 
  } else {

    alert("Usuário ou senha inválidos!");
  }

});