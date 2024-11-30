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

      this.style.borderBottomLeftRadius = "10px";
      this.style.borderBottomRightRadius = "10px";
      panel.style.borderBottomLeftRadius = "10px";
      panel.style.borderBottomRightRadius = "10px";
    }
  });
}

const elements = document.querySelectorAll('.titulo, .card, .accordion, .minhafoto, .titulosobremim, .paragrafosobremim, .accordionServicos, .img-proposta, .titulo-proposta, .paragrafo-proposta, button-proposta'); 

// Criar uma instância do IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');  // Adiciona a classe de animação
            entry.target.classList.remove('hidden'); // Remove a classe oculta
            observer.unobserve(entry.target); // Parar de observar o elemento após a animação
        }
    });
}, {
    threshold: 0.1  // O elemento é considerado visível quando 50% dele estiver na tela
});

// Observa os elementos
elements.forEach(element => {
    element.classList.add('hidden');  // Inicialmente, os elementos estão invisíveis
    observer.observe(element); // Observa cada elemento
});

document.getElementById('toTopButton').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.getElementById('toSectionButton').addEventListener('click', function() {
  const targetSection = document.querySelector('.sobremim');

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    const targetUrl = 'index.html#sobremim';
    window.location.href = targetUrl;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const fragment = window.location.hash;
  
  if (fragment) {
    const targetSection = document.querySelector(fragment);
    
    if (targetSection) {
      // Se a seção existir, rola até ela
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

let isScrolling = false;
let scrollVelocity = 0;

document.addEventListener('wheel', (e) => {
    e.preventDefault(); // Evita a rolagem padrão
    scrollVelocity += e.deltaY * 0.45; // Ajusta a sensibilidade do movimento
    isScrolling = true;
}, { passive: false });

function smoothScroll() {
    if (isScrolling || Math.abs(scrollVelocity) > 0.1) {
        window.scrollBy(0, scrollVelocity); // Rola a página com base na velocidade
        scrollVelocity *= 0.6; // Reduz gradualmente a velocidade (simula desaceleração)

        if (Math.abs(scrollVelocity) < 0.1) {
            scrollVelocity = 0; // Para a rolagem quando a velocidade é insignificante
            isScrolling = false;
        }
    }
    requestAnimationFrame(smoothScroll); // Continua atualizando a animação
}

// Inicia a função de atualização contínua
smoothScroll();