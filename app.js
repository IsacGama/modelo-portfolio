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

// Selecione todos os elementos que devem ser observados
const elements = document.querySelectorAll('.titulo, .card, .accordion, .minhafoto, .titulosobremim, .paragrafosobremim, .accordionServicos, .img-proposta, .titulo-proposta, .paragrafo-proposta, .button-proposta, .img-projetos');

// Configuração do IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona a classe para ativar a animação e remove a classe oculta
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');

            // Desobserva o elemento para melhorar o desempenho
            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px 0px -10% 0px', // Antecipe o disparo antes de o elemento ficar 100% visível
    threshold: 0.2                 // Reduza o ponto de interseção necessário
});

// Adicione a classe "hidden" inicialmente e observe os elementos
elements.forEach(el => {
    el.classList.add('hidden'); // Garante que eles começam ocultos
    observer.observe(el);
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});

// No callback, carregue as imagens quando elas forem visíveis
const loadImage = (img) => {
  img.src = img.dataset.src;
  img.onload = () => img.classList.add('loaded'); // Animação opcional
};

entries.forEach(entry => {
  if (entry.isIntersecting) {
      const target = entry.target;
      if (target.tagName === 'IMG' && target.dataset.src) {
          loadImage(target);
      }
      target.classList.add('visible');
      target.classList.remove('hidden');
      observer.unobserve(target);
  }
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