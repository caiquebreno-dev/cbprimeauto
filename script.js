/* =========================================
   CB PRIME AUTO — SCRIPT PRINCIPAL
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

// ---------- HORÁRIOS POR DIA ----------
const horariosPorDia = {
  "Segunda a Sexta": ["18:00", "20:00"],
  "Sábado":          ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
  "Domingo":         ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"]
};

// ---------- ESTADO ----------
let carrinho = [];
let catAtiva = "urbano";

// ---------- HORÁRIOS DINÂMICOS ----------
function atualizarHorarios() {
  const diaSelect  = document.getElementById("clienteData");
  const horaSelect = document.getElementById("clienteHora");
  const dia        = diaSelect.value;

  horaSelect.innerHTML = "";

  if (!dia) {
    horaSelect.innerHTML = '<option value="">Selecione o dia primeiro</option>';
    return;
  }

  const lista = horariosPorDia[dia] || [];

  lista.forEach(h => {
    const opt   = document.createElement("option");
    opt.value   = h;
    opt.textContent = h;
    horaSelect.appendChild(opt);
  });
}

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
  document.querySelectorAll("#tabs-motos .tab-btn")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderGrid(cat);
}

// ---------- CRIAR CARD ----------
function criarCard(servico) {
  const card = document.createElement("div");
  card.className = "service-card";
  card.id = "card-" + servico.id;

  const noCarrinho = carrinho.some(i => i.id === servico.id);

  card.innerHTML = `
    <div class="service-icon-box">${servico.icon}</div>
    <span class="service-cat-badge">
      <i class="fa-solid ${servico.catIcon}"></i> ${servico.catLabel}
    </span>
    <h3 class="service-name">${servico.nome}</h3>
    <p class="service-desc">${servico.descCurta}</p>
    <p class="service-exemplos">${servico.exemplos}</p>

    <div class="service-card-footer">
      <div class="service-price">
        R$ ${servico.preco.toFixed(2).replace(".", ",")}
      </div>
    </div>

    <div style="display:flex; gap:10px; margin-top:16px;">
      <button
        class="btn-secondary"
        style="flex:1; padding:10px; font-size:11px; justify-content:center;"
        onclick="abrirModal(${servico.id})">
        Veja Mais
      </button>
      <button
        class="add-btn ${noCarrinho ? "in-cart" : ""}"
        id="addbtn-${servico.id}"
        style="flex:1; justify-content:center;"
        onclick="toggleServico(${servico.id})">
        ${noCarrinho ? "✓ Adicionado" : "+ Add"}
      </button>
    </div>
  `;

  return card;
}

// ---------- ATUALIZAR BOTÃO DO CARD ----------
function atualizarBotaoCard(id) {
  const btn = document.getElementById("addbtn-" + id);
  if (!btn) return;

  const noCarrinho         = carrinho.some(i => i.id === id);
  btn.className            = "add-btn " + (noCarrinho ? "in-cart" : "");
  btn.textContent          = noCarrinho ? "✓ Adicionado" : "+ Add";
  btn.style.flex           = "1";
  btn.style.justifyContent = "center";
}

// ---------- CARRINHO ----------
function toggleServico(id) {
  const servico = servicos.motos.find(s => s.id === id);
  const existe  = carrinho.some(item => item.id === id);

  if (existe) {
    carrinho = carrinho.filter(item => item.id !== id);
    mostrarToast("Serviço removido.", "remove");
  } else {
    carrinho.push(servico);
    mostrarToast("Serviço adicionado!", "add");
  }

  atualizarCarrinho();
  atualizarBotaoCard(id);
}

function atualizarCarrinho() {
  const list    = document.getElementById("cartList");
  const empty   = document.getElementById("cartEmpty");
  const footer  = document.getElementById("cartFooter");
  const totalEl = document.getElementById("cartTotal");
  const badge   = document.getElementById("cartBadge");

  list.innerHTML = "";

  if (carrinho.length === 0) {
    empty.style.display  = "block";
    footer.style.display = "none";
    badge.classList.remove("visible");
    badge.textContent = "0";
    return;
  }

  empty.style.display  = "none";
  footer.style.display = "block";

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span class="cart-item-icon">${item.icon}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nome}</div>
        <div class="cart-item-cat">${item.catLabel}</div>
      </div>
      <div class="cart-item-price">R$ ${item.preco.toFixed(2).replace(".", ",")}</div>
      <button class="cart-remove-btn" onclick="toggleServico(${item.id})">✕</button>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = "R$ " + total.toFixed(2).replace(".", ",");
  badge.textContent   = carrinho.length;
  badge.classList.add("visible");
}

// ---------- WHATSAPP ----------
function finalizarPedido() {
  const nome    = document.getElementById("clienteNome").value.trim();
  const tel     = document.getElementById("clienteTel").value.trim();
  const data    = document.getElementById("clienteData").value;
  const hora    = document.getElementById("clienteHora").value;
  const veiculo = document.getElementById("clienteVeiculo").value.trim();
  const obs     = document.getElementById("clienteObs").value.trim();

  if (!nome || !tel || !data || !hora || carrinho.length === 0) {
    mostrarToast("Preencha tudo! Ou selecione um serviço!", "warning");
    return;
  }

  let msg = `*Novo Agendamento - CB Prime Auto*%0A%0A`;
  msg += `👤 Nome: ${encodeURIComponent(nome)}%0A`;
  msg += `📱 Tel: ${encodeURIComponent(tel)}%0A`;
  msg += `🏍️ Veículo: ${encodeURIComponent(veiculo || "Não informado")}%0A`;
  msg += `📅 Dia: ${encodeURIComponent(data)} às ${encodeURIComponent(hora)}%0A%0A`;
  msg += `🛠️ *Serviços:*%0A`;

  let totalPedido = 0;
  carrinho.forEach(item => {
    msg += `- ${encodeURIComponent(item.nome)} (${encodeURIComponent(item.catLabel)}) — R$ ${item.preco.toFixed(2).replace(".", ",")}%0A`;
    totalPedido += item.preco;
  });

  msg += `%0A💰 *Total: R$ ${totalPedido.toFixed(2).replace(".", ",")}*%0A`;
  if (obs) msg += `%0A📝 Obs: ${encodeURIComponent(obs)}`;

  window.open(`https://wa.me/5585998587467?text=${msg}`, "_blank");
}

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
  } else if (type === "remove") {
    toastIcon.innerHTML   = '<i class="fa-solid fa-circle-xmark"></i>';
    toastIcon.style.color = "#f87171";
  } else if (type === "warning") {
    toastIcon.innerHTML   = '<i class="fa-solid fa-triangle-exclamation"></i>';
    toastIcon.style.color = "#fbbf24";
  }

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ---------- MODAL ----------
function abrirModal(id) {
  const servico = servicos.motos.find(s => s.id === id);
  if (!servico) return;

  document.getElementById("modalIcon").innerHTML    = servico.icon;
  document.getElementById("modalTitle").textContent = servico.nome + " — " + servico.catLabel;
  document.getElementById("modalDesc").textContent  = servico.desc;
  document.getElementById("modalPrice").textContent = "R$ " + servico.preco.toFixed(2).replace(".", ",");

  const addBtn   = document.getElementById("modalAddBtn");
  addBtn.onclick = () => { toggleServico(servico.id); fecharModal(); };

  document.getElementById("serviceModal").classList.add("active");
}

function fecharModal() {
  document.getElementById("serviceModal").classList.remove("active");
}

document.getElementById("serviceModal").addEventListener("click", function (e) {
  if (e.target === this) fecharModal();
});

// ---------- INIT ----------
renderServicos();
atualizarCarrinho();
