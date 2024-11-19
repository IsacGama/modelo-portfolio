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

var accServicos = document.getElementsByClassName("accordionServicos");

for (let i = 0; i < accServicos.length; i++) { 
  accServicos[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      this.style.borderBottomLeftRadius = "10px"; 
      this.style.borderBottomRightRadius = "10px"; 
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      this.style.borderBottomLeftRadius = "0";
      this.style.borderBottomRightRadius = "0";
    }
  });
}
