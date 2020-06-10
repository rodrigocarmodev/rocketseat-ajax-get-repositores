function exibeCarregando() {
  var carregandoElement = document.createElement("div");
  var carregandoTexto = document.createTextNode("Carregando ...");
  carregandoElement.appendChild(carregandoTexto);
  listaDeRepos.appendChild(carregandoElement);
}

function exibeRepos() {
  var listaDeRepos = document.querySelector("#listaDeRepos");
  var usuario = document.querySelector("input[name=user]");
  listaDeRepos.innerHTML = ""; // Limpa tudo
  exibeCarregando();

  axios
    .get("https://api.github.com/users/" + usuario.value + "/repos")
    .then(function (response) {
      listaDeRepos.innerHTML = ""; // Limpa tudo
      var ul = document.createElement("ul");
      var lista = listaDeRepos.appendChild(ul);

      if (response.data.length === 0) {
        var divMsg = document.createElement("div");
        var msg = document.createTextNode("Usuário sem repositórios.");
        listaDeRepos.appendChild(divMsg);
        divMsg.appendChild(msg);
      } else {
        for (x of response.data) {
          var nomeRepos = document.createTextNode(x.name);
          var item = document.createElement("li");
          item.appendChild(nomeRepos);
          lista.appendChild(item);
        }
      }
    })
    .catch(function (error) {
      listaDeRepos.innerHTML = ""; // Limpa tudo
      var divMsg = document.createElement("div");
      var msg = document.createTextNode(
        "Ops, usuário não encontrado. Verifique se digitou corretamente."
      );
      listaDeRepos.appendChild(divMsg);
      divMsg.appendChild(msg);
    });
}
