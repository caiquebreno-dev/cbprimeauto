/* =========================================
   CB PRIME AUTO — SCRIPT PRINCIPAL
========================================= */

// ---------- DADOS DOS SERVIÇOS ----------
const servicos = {
  carros: [
    {
      id: 1,
      nome: "Lavagem Completa",
      descCurta: "Cuidado e segurança para a pintura.",
      desc: "Na Lavagem Completa, é feita a pré-lavagem e lavagem minuciosa a fim de evitar riscos na pintura do seu veículo, garantindo a máxima segurança e um brilho incrível.",
      preco: 30,
      icon: '<i class="fa-solid fa-soap"></i>'
    },
    {
      id: 2,
      nome: "Detalhamento na Interna",
      descCurta: "Limpeza profunda do interior.",
      desc: "Cuidado minucioso em todas as superfícies internas do veículo, incluindo painel, plásticos, bancos e carpetes, garantindo higiene e renovação.",
      preco: 15,
      icon: '<i class="fa-solid fa-spray-can"></i>'
    }
  ],
  motos: [
    {
      id: 3,
      nome: "Lavagem Completa",
      descCurta: "Limpeza detalhada para motos.",
      desc: "Lavagem completa e cuidadosa para sua moto. Processo detalhado para remover sujeiras de áreas difíceis e proteger os componentes.",
      preco: 20,
      icon: '<i class="fa-solid fa-motorcycle"></i>'
    }
  ]
};

// ---------- ESTADO ----------
let carrinho = [];

// ---------- RENDER SERVIÇOS ----------
function renderServicos() {
  const gridCarros = document.getElementById("grid-carros");
  const gridMotos  = document.getElementById("grid-motos");

  gridCarros.innerHTML = "";
  gridMotos.innerHTML  = "";

  servicos.carros.forEach(s => gridCarros.appendChild(criarCard(s)));
  servicos.motos.forEach(s  => gridMotos.appendChild(criarCard(s)));
}

function criarCard(servico) {
  const card = document.createElement("div");
  card.className = "service-card";
  card.id = "card-" + servico.id;

  const noCarrinho = carrinho.some(i => i.id === servico.id);

  card.innerHTML = `
    <div class="service-icon-box">${servico.icon}</div>
    <h3 class="service-name">${servico.nome}</h3>
    <p class="service-desc">${servico.descCurta}</p>

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
        class="add-btn ${noCarrinho ? 'in-cart' : ''}"
        id="addbtn-${servico.id}"
        style="flex:1; justify-content:center;"
        onclick="toggleServico(${servico.id})">
        ${noCarrinho ? '✓ Adicionado' : '+ Add'}
      </button>
    </div>
  `;

  return card;
}

// ---------- ATUALIZAR BOTÃO DO CARD ----------
function atualizarBotaoCard(id) {
  const btn = document.getElementById("addbtn-" + id);
  if (!btn) return;

  const noCarrinho = carrinho.some(i => i.id === id);
  btn.className  = "add-btn " + (noCarrinho ? "in-cart" : "");
  btn.textContent = noCarrinho ? "✓ Adicionado" : "+ Add";
  btn.style.flex  = "1";
  btn.style.justifyContent = "center";
}

// ---------- CARRINHO ----------
function toggleServico(id) {
  const todos   = [...servicos.carros, ...servicos.motos];
  const servico = todos.find(s => s.id === id);
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
      </div>
      <div class="cart-item-price">
        R$ ${item.preco.toFixed(2).replace(".", ",")}
      </div>
      <button class="cart-remove-btn" onclick="toggleServico(${item.id})">✕</button>
    `;

    list.appendChild(li);
  });

  totalEl.textContent  = "R$ " + total.toFixed(2).replace(".", ",");
  badge.textContent    = carrinho.length;
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
  msg += `🚗 Veículo: ${encodeURIComponent(veiculo || "Não informado")}%0A`;
  msg += `📅 Dia: ${encodeURIComponent(data)} às ${encodeURIComponent(hora)}%0A%0A`;
  msg += `🛠️ *Serviços:%0A`;

  let totalPedido = 0;
  carrinho.forEach(item => {
    msg += `- ${encodeURIComponent(item.nome)} (R$ ${item.preco.toFixed(2).replace(".", ",")})%0A`;
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

// ---------- SCROLL SUAVE ----------
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// ---------- HEADER AO SCROLLAR ----------
window.addEventListener("scroll", () => {
  document.getElementById("header").classList.toggle("scrolled", window.scrollY > 50);
});

// ---------- ANIMAÇÃO REVEAL ----------
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
    toastIcon.innerHTML  = '<i class="fa-solid fa-circle-check"></i>';
    toastIcon.style.color = "#4ade80";
  } else if (type === "remove") {
    toastIcon.innerHTML  = '<i class="fa-solid fa-circle-xmark"></i>';
    toastIcon.style.color = "#f87171";
  } else if (type === "warning") {
    toastIcon.innerHTML  = '<i class="fa-solid fa-triangle-exclamation"></i>';
    toastIcon.style.color = "#fbbf24";
  }

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ---------- TABS ----------
function switchTab(tab, btn) {
  document.querySelectorAll(".tab-btn").forEach(b   => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

  btn.classList.add("active");
  document.getElementById("tab-" + tab).classList.add("active");
}

// ---------- MODAL ----------
function abrirModal(id) {
  const todos   = [...servicos.carros, ...servicos.motos];
  const servico = todos.find(s => s.id === id);
  if (!servico) return;

  document.getElementById("modalIcon").innerHTML     = servico.icon;
  document.getElementById("modalTitle").textContent  = servico.nome;
  document.getElementById("modalDesc").textContent   = servico.desc;
  document.getElementById("modalPrice").textContent  =
    "R$ " + servico.preco.toFixed(2).replace(".", ",");

  const addBtn    = document.getElementById("modalAddBtn");
  addBtn.onclick  = () => {
    toggleServico(servico.id);
    fecharModal();
  };

  document.getElementById("serviceModal").classList.add("active");
}

function fecharModal() {
  document.getElementById("serviceModal").classList.remove("active");
}

// ---------- FECHAR MODAL AO CLICAR FORA ----------
document.getElementById("serviceModal").addEventListener("click", function (e) {
  if (e.target === this) fecharModal();
});

// ---------- INIT ----------
renderServicos();
atualizarCarrinho();