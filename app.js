// Menu Mobile
const menuToggle = document.createElement("button");
menuToggle.className = "menu-toggle";
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
menuToggle.ariaLabel = "Menu";
document.querySelector(".navbar").appendChild(menuToggle);

const menu = document.querySelector(".menu");
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuToggle.innerHTML = menu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll(".menu a").forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const projectCards = document.querySelectorAll(".project-card");

const cardWidth = projectCards[0].offsetWidth + 30;

prevBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: -cardWidth,
    behavior: "smooth",
  });
});

nextBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: cardWidth,
    behavior: "smooth",
  });
});

// Botão voltar ao topo
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Toggle modo claro/escuro
const modeToggle = document.getElementById("modeToggle");

// Verifica preferência do usuário no localStorage
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.body.classList.add(currentTheme);
  updateToggleIcon();
}

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark-mode" : ""
  );
  updateToggleIcon();
});

function updateToggleIcon() {
  modeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
}

// Validação do formulário
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulação de envio
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());

    console.log("Dados do formulário:", formValues);

    // Feedback visual
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    // Simula delay de envio
    setTimeout(() => {
      submitBtn.textContent = "Mensagem Enviada!";

      // Cria elemento de feedback
      const feedback = document.createElement("div");
      feedback.className = "form-feedback success";
      feedback.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Sua mensagem foi enviada com sucesso! Entrarei em contato em breve.</p>
      `;

      contactForm.parentNode.insertBefore(feedback, contactForm.nextSibling);
      contactForm.reset();

      // Restaura botão após 3 segundos
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        feedback.remove();
      }, 3000);
    }, 1500);
  });
}

// Atualiza ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

// Efeito de digitação na seção hero (opcional)
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero h1");
  if (!heroTitle) return;

  const originalText = heroTitle.textContent;
  heroTitle.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  // Só ativa se a seção hero estiver visível
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      typeWriter();
      observer.disconnect();
    }
  });

  observer.observe(heroTitle);
}

// Inicia quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  initTypingEffect();

  // Adiciona classe de carregamento para transições suaves
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 200);
});
