/* =========================================
   CB PRIME AUTO — SCRIPT PRINCIPAL
   (sem carrinho — só vitrine de serviços)
========================================= */

// ---------- DADOS DOS SERVIÇOS ----------
const servicos = {
  motos: [
    {
      id: 1,
      cat: "urbano",
      catLabel: "Uso Urbano",
      catIcon: "fa-city",
      nome: "Lavagem Completa",
      descCurta: "Para motos de uso urbano de 125cc e 150cc.",
      desc: "Lavagem completa e cuidadosa para motos de uso urbano como CG 125, CG 150, Biz, Pop e Fan. Processo detalhado para remover sujeira do dia a dia e proteger todos os componentes.",
      preco: 25,
      icon: '<i class="fa-solid fa-droplet"></i>',
      exemplos: "Ex: CG 125, CG 150, Biz, Pop, Fan"
    },
    {
      id: 2,
      cat: "naked",
      catLabel: "Naked",
      catIcon: "fa-gauge-high",
      nome: "Lavagem Completa",
      descCurta: "Para naked bikes de médio porte.",
      desc: "Lavagem minuciosa para naked bikes como FZ-25 e MT-03. Processo cuidadoso que respeita as peças expostas e garante brilho em toda a moto.",
      preco: 30,
      icon: '<i class="fa-solid fa-droplet"></i>',
      exemplos: "Ex: FZ-25, MT-03, Z300, CB 300"
    },
    {
      id: 3,
      cat: "trail",
      catLabel: "Trail / Adventure",
      catIcon: "fa-mountain",
      nome: "Lavagem Completa",
      descCurta: "Para trail e adventure bikes.",
      desc: "Lavagem completa para motos trail e adventure. Remoção eficiente de lama, poeira e sujeira de uso misto, protegendo todos os componentes.",
      preco: 30,
      icon: '<i class="fa-solid fa-droplet"></i>',
      exemplos: "Ex: Lander, Tenere, XRE 300, Crosser"
    },
    {
      id: 4,
      cat: "scooter",
      catLabel: "Scooter",
      catIcon: "fa-circle-dot",
      nome: "Lavagem Completa",
      descCurta: "Para scooters e maxi-scooters.",
      desc: "Lavagem completa da scooter com atenção especial às carenagens, rodas e compartimento interno de bagagem.",
      preco: 30,
      icon: '<i class="fa-solid fa-droplet"></i>',
      exemplos: "Ex: PCX, NMax, Lead, Burgman 125"
    }
  ]
};

// ---------- ESTADO ----------
let catAtiva = "urbano";

// ---------- RENDER SERVIÇOS ----------
function renderServicos() {
  renderCatButtons();
  renderGrid(catAtiva);
}

function renderCatButtons() {
  const wrapper = document.getElementById("tabs-motos");
  if (!wrapper) return;

  const cats = [
    { key: "urbano",  label: "Uso Urbano",       icon: "fa-city"       },
    { key: "naked",   label: "Naked",             icon: "fa-gauge-high" },
    { key: "trail",   label: "Trail / Adventure", icon: "fa-mountain"   },
    { key: "scooter", label: "Scooter",           icon: "fa-circle-dot" }
  ];

  wrapper.innerHTML = cats.map(c => `
    <button
      class="tab-btn ${c.key === catAtiva ? "active" : ""}"
      onclick="switchCat('${c.key}', this)">
      <span><i class="fa-solid ${c.icon}"></i></span>
      ${c.label}
    </button>
  `).join("");
}

function renderGrid(cat) {
  const grid = document.getElementById("grid-motos");
  if (!grid) return;

  grid.innerHTML = "";
  servicos.motos
    .filter(s => s.cat === cat)
    .forEach(s => grid.appendChild(criarCard(s)));
}

function switchCat(cat, btn) {
  catAtiva = cat;
  document.querySelectorAll("#tabs-motos .tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderGrid(cat);
}

// ---------- CRIAR CARD ----------
function criarCard(servico) {
  const card     = document.createElement("div");
  card.className = "service-card";
  card.id        = "card-" + servico.id;

  card.innerHTML = `
    <div class="service-icon-box">${servico.icon}</div>
    <span class="service-cat-badge">
      <i class="fa-solid ${servico.catIcon}"></i> ${servico.catLabel}
    </span>
    <h3 class="service-name">${servico.nome}</h3>
    <p class="service-desc">${servico.descCurta}</p>
    <p class="service-exemplos">${servico.exemplos}</p>
    <div class="service-card-footer">
      <div class="service-price">R$ ${servico.preco.toFixed(2).replace(".", ",")}</div>
    </div>
    <div style="display:flex; gap:10px; margin-top:16px;">
      <button class="btn-secondary"
        style="flex:1; padding:10px; font-size:11px; justify-content:center;"
        onclick="abrirModal(${servico.id})">
        Veja Mais
      </button>
      <a href="https://wa.me/5585998587467" target="_blank"
        class="add-btn"
        style="flex:1; justify-content:center; text-decoration:none; display:flex; align-items:center;">
        <i class="fa-brands fa-whatsapp" style="margin-right:5px;"></i> Agendar
      </a>
    </div>
  `;

  return card;
}

// ---------- MODAL ----------
function abrirModal(id) {
  const servico = servicos.motos.find(s => s.id === id);
  if (!servico) return;

  document.getElementById("modalIcon").innerHTML    = servico.icon;
  document.getElementById("modalTitle").textContent = servico.nome + " — " + servico.catLabel;
  document.getElementById("modalDesc").textContent  = servico.desc;
  document.getElementById("modalPrice").textContent = "R$ " + servico.preco.toFixed(2).replace(".", ",");

  // Monta mensagem pré-preenchida no WhatsApp
  const msg = encodeURIComponent(
    `Olá! Gostaria de agendar:\n\n🏍️ Serviço: ${servico.nome} — ${servico.catLabel}\n💰 Valor: R$ ${servico.preco.toFixed(2).replace(".", ",")}\n\nPode me informar os horários disponíveis?`
  );
  document.getElementById("modalWaBtn").href = `https://wa.me/5585998587467?text=${msg}`;

  document.getElementById("serviceModal").classList.add("active");
}

function fecharModal() {
  document.getElementById("serviceModal").classList.remove("active");
}

document.getElementById("serviceModal").addEventListener("click", function (e) {
  if (e.target === this) fecharModal();
});

// ---------- MENU MOBILE ----------
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

function closeMobileMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
}

// ---------- SCROLL ----------
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// ---------- HEADER SCROLL ----------
window.addEventListener("scroll", () => {
  document.getElementById("header").classList.toggle("scrolled", window.scrollY > 50);
});

// ---------- REVEAL ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- TOAST ----------
function mostrarToast(msg, type) {
  const toast     = document.getElementById("toast");
  const toastMsg  = document.getElementById("toastMsg");
  const toastIcon = document.getElementById("toastIcon");

  toastMsg.textContent = msg;

  if (type === "add") {
    toastIcon.innerHTML   = '<i class="fa-solid fa-circle-check"></i>';
    toastIcon.style.color = "#4ade80";
  } else if (type === "warning") {
    toastIcon.innerHTML   = '<i class="fa-solid fa-triangle-exclamation"></i>';
    toastIcon.style.color = "#fbbf24";
  }

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ---------- INIT ----------
renderServicos();
