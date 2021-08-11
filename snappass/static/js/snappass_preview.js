(function () {
  document.querySelector("#revealSecret").addEventListener("click", (e) => { 
    var form = document.createElement("form");
    form.setAttribute("id","revealSecretForm");
    form.setAttribute("method","post");
    document.querySelector("body").appendChild(form);
    form.submit();
  });
})();
