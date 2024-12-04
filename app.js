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
      panel.style.maxHeight = null;

      panel.style.borderBottomLeftRadius = "10px";
      panel.style.borderBottomRightRadius = "10px";

      panel.addEventListener(
        "transitionend",
        () => {
          this.style.borderBottomLeftRadius = "10px";
          this.style.borderBottomRightRadius = "10px";
        },
        { once: true }
      );
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";

      this.style.borderBottomLeftRadius = "10px";
      this.style.borderBottomRightRadius = "10px";
      panel.style.borderBottomLeftRadius = "10px";
      panel.style.borderBottomRightRadius = "10px";
    }
  });
}

const elements = document.querySelectorAll('.titulo, .card, .accordion, .minhafoto, .titulosobremim, .paragrafosobremim, .accordionServicos, .img-proposta, .titulo-proposta, .paragrafo-proposta, .button-proposta, .img-projetos, .sobre-o-projeto');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');

            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.2
});

elements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});

const loadImage = (img) => {
  img.src = img.dataset.src;
  img.onload = () => img.classList.add('loaded'); 
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
    e.preventDefault(); 
    scrollVelocity += e.deltaY * 0.45; 
    isScrolling = true;
}, { passive: false });

function smoothScroll() {
    if (isScrolling || Math.abs(scrollVelocity) > 0.1) {
        window.scrollBy(0, scrollVelocity);
        scrollVelocity *= 0.6; 

        if (Math.abs(scrollVelocity) < 0.1) {
            scrollVelocity = 0;
            isScrolling = false;
        }
    }
    requestAnimationFrame(smoothScroll);
}

smoothScroll();