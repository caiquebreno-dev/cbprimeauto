/* =========================================
   CB PRIME AUTO — SCRIPT PRINCIPAL
   (sem carrinho — só vitrine de serviços)
========================================= */

// ---------- DADOS DOS SERVIÇOS — CARROS ----------
const servicosCarros = [
  {
    id: "c1",
    cat: "hatch",
    catLabel: "Hatch",
    catIcon: "fa-car",
    nome: "Lavagem Completa",
    descCurta: "Compactos urbanos do dia a dia.",
    desc: "Lavagem completa para hatchbacks compactos urbanos. Processo cuidadoso que remove sujeira do uso diário e protege a lataria e os plásticos internos e externos.",
    precoTexto: "R$ 55,00",
    preco: 55,
    icon: '<i class="fa-solid fa-car"></i>',
    exemplos: "Ex: Volkswagen Gol, Chevrolet Onix, Hyundai HB20"
  },
  {
    id: "c2",
    cat: "seda",
    catLabel: "Sedã",
    catIcon: "fa-car-side",
    nome: "Lavagem Completa",
    descCurta: "Familiares com porta-malas longo.",
    desc: "Lavagem completa para sedãs, com atenção especial ao porta-malas, soleiras e rodas. Ideal para quem precisa de um resultado impecável no trabalho ou dia a dia.",
    precoTexto: "R$ 60,00",
    preco: 60,
    icon: '<i class="fa-solid fa-car-side"></i>',
    exemplos: "Ex: Chevrolet Prisma, Honda Civic, Toyota Corolla"
  },
  {
    id: "c3",
    cat: "suv",
    catLabel: "SUV",
    catIcon: "fa-truck-monster",
    nome: "Lavagem Completa",
    descCurta: "Veículos altos e espaçosos.",
    desc: "Lavagem completa para SUVs, com cuidado redobrado nas rodas grandes, caixas de roda e partes plásticas externas. O tamanho maior exige mais atenção — e é isso que entregamos.",
    precoTexto: "R$ 60,00 a R$ 70,00",
    preco: 65,
    icon: '<i class="fa-solid fa-truck-monster"></i>',
    exemplos: "Ex: Jeep Renegade, Hyundai Creta, Toyota SW4"
  },
  {
    id: "c4",
    cat: "picape",
    catLabel: "Picape",
    catIcon: "fa-truck-pickup",
    nome: "Lavagem Completa",
    descCurta: "Veículos com caçamba de carga.",
    desc: "Lavagem completa para picapes, incluindo a caçamba de carga. Remoção eficiente de poeira, lama e resíduos, deixando o veículo limpo de ponta a ponta.",
    precoTexto: "R$ 60,00",
    preco: 60,
    icon: '<i class="fa-solid fa-truck-pickup"></i>',
    exemplos: "Ex: Fiat Strada, Volkswagen Saveiro, Toyota Hilux"
  },
  {
    id: "c5",
    cat: "cupe",
    catLabel: "Cupê",
    catIcon: "fa-car-burst",
    nome: "Lavagem Completa",
    descCurta: "Esportivos de duas portas.",
    desc: "Lavagem completa para cupês esportivos, com tratamento delicado nas saias, difusores e rodas de alto desempenho. Perfeito para quem valoriza detalhes e exige o melhor.",
    precoTexto: "R$ 55,00",
    preco: 55,
    icon: '<i class="fa-solid fa-car-burst"></i>',
    exemplos: "Ex: Chevrolet Camaro, Ford Mustang, BMW Série 4 Coupé"
  }
];

// ---------- DADOS DOS SERVIÇOS — MOTOS ----------
const servicosMotos = [
  {
    id: "m1",
    cat: "urbano",
    catLabel: "Uso Urbano",
    catIcon: "fa-city",
    nome: "Lavagem Completa",
    descCurta: "Para motos de uso urbano de 125cc e 150cc.",
    desc: "Lavagem completa e cuidadosa para motos de uso urbano como CG 125, CG 150, Biz, Pop e Fan. Processo detalhado para remover sujeira do dia a dia e proteger todos os componentes.",
    precoTexto: "R$ 25,00",
    preco: 25,
    icon: '<i class="fa-solid fa-droplet"></i>',
    exemplos: "Ex: CG 125, CG 150, Biz, Pop, Fan"
  },
  {
    id: "m2",
    cat: "naked",
    catLabel: "Naked",
    catIcon: "fa-gauge-high",
    nome: "Lavagem Completa",
    descCurta: "Para naked bikes de médio porte.",
    desc: "Lavagem minuciosa para naked bikes como FZ-25 e MT-03. Processo cuidadoso que respeita as peças expostas e garante brilho em toda a moto.",
    precoTexto: "R$ 30,00",
    preco: 30,
    icon: '<i class="fa-solid fa-droplet"></i>',
    exemplos: "Ex: FZ-25, MT-03, Z300, CB 300"
  },
  {
    id: "m3",
    cat: "trail",
    catLabel: "Trail / Adventure",
    catIcon: "fa-mountain",
    nome: "Lavagem Completa",
    descCurta: "Para trail e adventure bikes.",
    desc: "Lavagem completa para motos trail e adventure. Remoção eficiente de lama, poeira e sujeira de uso misto, protegendo todos os componentes.",
    precoTexto: "R$ 30,00",
    preco: 30,
    icon: '<i class="fa-solid fa-droplet"></i>',
    exemplos: "Ex: Lander, Tenere, XRE 300, Crosser"
  },
  {
    id: "m4",
    cat: "scooter",
    catLabel: "Scooter",
    catIcon: "fa-circle-dot",
    nome: "Lavagem Completa",
    descCurta: "Para scooters e maxi-scooters.",
    desc: "Lavagem completa da scooter com atenção especial às carenagens, rodas e compartimento interno de bagagem.",
    precoTexto: "R$ 30,00",
    preco: 30,
    icon: '<i class="fa-solid fa-droplet"></i>',
    exemplos: "Ex: PCX, NMax, Lead, Burgman 125"
  }
];

// ---------- ESTADO ----------
let veiculoAtivo   = "carros";   // "carros" | "motos"
let catCarroAtiva  = "hatch";
let catMotoAtiva   = "urbano";

// ---------- SWITCHER DE VEÍCULO ----------
function switchVeiculo(tipo) {
  veiculoAtivo = tipo;

  document.querySelectorAll(".veiculo-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("btn-veiculo-" + tipo).classList.add("active");

  document.querySelectorAll(".veiculo-panel").forEach(p => p.classList.remove("active"));
  document.getElementById("panel-" + tipo).classList.add("active");
}

// ---------- RENDER CARROS ----------
function renderCarros() {
  const catsCarros = [
    { key: "hatch",  label: "Hatch",  icon: "fa-car"          },
    { key: "seda",   label: "Sedã",   icon: "fa-car-side"     },
    { key: "suv",    label: "SUV",    icon: "fa-truck-monster"},
    { key: "picape", label: "Picape", icon: "fa-truck-pickup" },
    { key: "cupe",   label: "Cupê",   icon: "fa-car-burst"    }
  ];

  const tabsEl = document.getElementById("tabs-carros");
  if (tabsEl) {
    tabsEl.innerHTML = catsCarros.map(c => `
      <button
        class="tab-btn ${c.key === catCarroAtiva ? "active" : ""}"
        onclick="switchCatCarro('${c.key}', this)">
        <span><i class="fa-solid ${c.icon}"></i></span>
        ${c.label}
      </button>
    `).join("");
  }

  renderGridCarros(catCarroAtiva);
}

function renderGridCarros(cat) {
  const grid = document.getElementById("grid-carros");
  if (!grid) return;
  grid.innerHTML = "";
  servicosCarros
    .filter(s => s.cat === cat)
    .forEach(s => grid.appendChild(criarCard(s, "carros")));
}

function switchCatCarro(cat, btn) {
  catCarroAtiva = cat;
  document.querySelectorAll("#tabs-carros .tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderGridCarros(cat);
}

// ---------- RENDER MOTOS ----------
function renderMotos() {
  const catsMotos = [
    { key: "urbano",  label: "Uso Urbano",       icon: "fa-city"       },
    { key: "naked",   label: "Naked",             icon: "fa-gauge-high" },
    { key: "trail",   label: "Trail / Adventure", icon: "fa-mountain"   },
    { key: "scooter", label: "Scooter",           icon: "fa-circle-dot" }
  ];

  const tabsEl = document.getElementById("tabs-motos");
  if (tabsEl) {
    tabsEl.innerHTML = catsMotos.map(c => `
      <button
        class="tab-btn ${c.key === catMotoAtiva ? "active" : ""}"
        onclick="switchCatMoto('${c.key}', this)">
        <span><i class="fa-solid ${c.icon}"></i></span>
        ${c.label}
      </button>
    `).join("");
  }

  renderGridMotos(catMotoAtiva);
}

function renderGridMotos(cat) {
  const grid = document.getElementById("grid-motos");
  if (!grid) return;
  grid.innerHTML = "";
  servicosMotos
    .filter(s => s.cat === cat)
    .forEach(s => grid.appendChild(criarCard(s, "motos")));
}

function switchCatMoto(cat, btn) {
  catMotoAtiva = cat;
  document.querySelectorAll("#tabs-motos .tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderGridMotos(cat);
}

// ---------- CRIAR CARD ----------
function criarCard(servico, tipo) {
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
      <div class="service-price">${servico.precoTexto}</div>
    </div>
    <div style="display:flex; gap:10px; margin-top:16px;">
      <button class="btn-secondary"
        style="flex:1; padding:10px; font-size:11px; justify-content:center;"
        onclick="abrirModal('${servico.id}', '${tipo}')">
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
function abrirModal(id, tipo) {
  const lista   = tipo === "carros" ? servicosCarros : servicosMotos;
  const servico = lista.find(s => s.id === id);
  if (!servico) return;

  document.getElementById("modalIcon").innerHTML    = servico.icon;
  document.getElementById("modalTitle").textContent = servico.catLabel + " — " + servico.nome;
  document.getElementById("modalDesc").textContent  = servico.desc;
  document.getElementById("modalPrice").textContent = servico.precoTexto;

  const emoji = tipo === "carros" ? "🚗" : "🏍️";
  const msg = encodeURIComponent(
    `Olá! Gostaria de agendar:\n\n${emoji} Categoria: ${servico.catLabel}\n🧼 Serviço: ${servico.nome}\n💰 Valor: ${servico.precoTexto}\n\nPode me informar os horários disponíveis?`
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
renderCarros();
renderMotos();
