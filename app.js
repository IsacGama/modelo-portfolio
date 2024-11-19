var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

var accServicos = document.getElementsByClassName("accordionServicos");

for (let i = 0; i < accServicos.length; i++) {
  accServicos[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      // Fechando o painel
      panel.style.maxHeight = null;

      // Garantir que o border-radius do painel seja mantido durante o fechamento
      panel.style.borderBottomLeftRadius = "10px";
      panel.style.borderBottomRightRadius = "10px";

      // Após o fechamento completo, restaurar o border-radius no botão
      panel.addEventListener(
        "transitionend",
        () => {
          this.style.borderBottomLeftRadius = "10px";
          this.style.borderBottomRightRadius = "10px";
        },
        { once: true }
      );
    } else {
      // Abrindo o painel
      panel.style.maxHeight = panel.scrollHeight + "px";

      // Ajustar os estilos
      this.style.borderBottomLeftRadius = "10px";
      this.style.borderBottomRightRadius = "10px";
      panel.style.borderBottomLeftRadius = "10px";
      panel.style.borderBottomRightRadius = "10px";
    }
  });
}