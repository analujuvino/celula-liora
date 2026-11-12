/* =====================================================
   LIORA CÉLULA — comportamento do site
   Os dados (eventos, fotos, links) ficam em js/dados.js
   ===================================================== */

const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];
const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Funções de apoio ---------- */
// Escapa texto vindo de dados.js antes de colocar no HTML
const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const formatar = (data, opcoes) => data.toLocaleDateString("pt-BR", opcoes);

/* ---------- Links de contato ---------- */
$("#link-whatsapp").href = DADOS.contato.whatsapp;
$("#link-instagram").href = DADOS.contato.instagram;

/* ---------- Menu (celular) ---------- */
const botaoMenu = $(".topo__botao");
const menu = $("#menu");

function alternarMenu(abrir) {
  menu.classList.toggle("aberto", abrir);
  botaoMenu.setAttribute("aria-expanded", abrir);
  document.body.style.overflow = abrir ? "hidden" : "";
}
botaoMenu.addEventListener("click", () => alternarMenu(botaoMenu.getAttribute("aria-expanded") !== "true"));
$$("a", menu).forEach(a => a.addEventListener("click", () => alternarMenu(false)));
addEventListener("keydown", e => { if (e.key === "Escape") alternarMenu(false); });

/* ---------- Revelar elementos ao rolar ---------- */
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visivel"); observador.unobserve(e.target); }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });


/* ---------- Seção ativa no menu ---------- */
const links = $$(".menu a");
const secoes = links.map(a => $(a.getAttribute("href"))).filter(Boolean);
const observadorMenu = new IntersectionObserver((entradas) => {
  entradas.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("ativo", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
secoes.forEach(s => observadorMenu.observe(s));

/* ---------- Foto clicável (abre ampliada) ---------- */
function criarFoto(item, indice, lista) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "foto";
  botao.setAttribute("aria-label", `Ampliar: ${item.legenda || item.alt}`);
  botao.innerHTML = `<img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy"${item.girar ? ' class="girada"' : ""} style="object-position:${esc(item.posicao || "center")}">` +
    (item.legenda ? `<span class="foto__legenda">${esc(item.legenda)}</span>` : "");
  botao.addEventListener("click", () => abrirLightbox(lista, indice));
  return botao;
}

/* ---------- Mosaico "Frontstage" ---------- */
const mosaico = $("#mosaico");
DADOS.galeria.forEach((item, i) => mosaico.appendChild(criarFoto(item, i, DADOS.galeria)));

/* ---------- Galeria "Backstage": cada foto no espaço do seu formato ---------- */
const galeria = $("#galeria");
function aplicarFormato(botao, proporcao) {
  botao.style.setProperty("--r", proporcao);
  botao.classList.toggle("foto--vertical", proporcao < 1);
}
DADOS.backstage.forEach((item, i) => {
  const botao = criarFoto(item, i, DADOS.backstage);
  aplicarFormato(botao, item.proporcao || 1);
  // Se a proporção não foi informada, descobre pelo tamanho real da imagem
  const img = $("img", botao);
  if (!item.proporcao) img.addEventListener("load", () => aplicarFormato(botao, img.naturalWidth / img.naturalHeight), { once: true });
  galeria.appendChild(botao);
});

/* ---------- Faixa de fotos do rodapé (lista "rodape" do dados.js) ---------- */
const faixa = $("#faixa");
DADOS.rodape.forEach(src => {
  const d = document.createElement("div");
  d.className = "faixa__item";
  d.innerHTML = `<img src="${esc(src)}" alt="" loading="lazy">`;
  faixa.appendChild(d);
});

/* ---------- Liderança ---------- */
const listaLideres = $("#lideres-lista");
DADOS.lideranca.forEach((l, i) => {
  const card = document.createElement("article");
  card.className = "lider revelar";
  card.style.transitionDelay = `${i * 0.15}s`;
  card.innerHTML = `
    <div class="lider__foto">
      <img src="${esc(l.foto)}" alt="${esc(l.nome)}, ${esc(l.papel)}" loading="lazy" style="object-position:${esc(l.posicao || "center")}">
    </div>
    <p class="lider__papel">${esc(l.papel)}</p>
    <h3>${esc(l.nome)}</h3>
    <p>${esc(l.descricao)}</p>`;
  listaLideres.appendChild(card);
});

/* ---------- Mural vivo (vídeos que tocam no site) ---------- */
const trilhoVideos = $("#videos-lista");
DADOS.videos.forEach((v, i) => {
  const cartaoV = document.createElement("figure");
  cartaoV.className = "video revelar";
  cartaoV.style.transitionDelay = `${i * 0.12}s`;
  cartaoV.innerHTML = `<div class="video__tela"><video src="${esc(v.src)}"${v.capa ? ` poster="${esc(v.capa)}"` : ""} controls playsinline preload="metadata" aria-label="${esc(v.legenda || "Vídeo da Liora")}"></video></div>` +
    (v.legenda ? `<figcaption class="video__legenda">${esc(v.legenda)}</figcaption>` : "");
  trilhoVideos.appendChild(cartaoV);
});

// Só um vídeo tocando por vez
$$("video", trilhoVideos).forEach(vid => vid.addEventListener("play", () => {
  $$("video", trilhoVideos).forEach(outro => { if (outro !== vid) outro.pause(); });
}));

/* ---------- Próximo encontro ---------- */
const cartao = $("#proximo-cartao");
// Próxima quinta-feira (ou o encontro especial mais cedo, se houver). Fica "em andamento" até o fim.
const agora = new Date();
function proximaOcorrencia() {
  const e = DADOS.encontro;
  const [h, min] = e.hora.split(":").map(Number);
  const d = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), h, min);
  d.setDate(d.getDate() + ((e.diaSemana - d.getDay() + 7) % 7));
  if (d.getTime() + e.duracaoHoras * 3600000 < agora.getTime()) d.setDate(d.getDate() + 7);
  return { titulo: e.titulo, local: e.local, descricao: e.descricao, inicio: d };
}
const especial = (DADOS.especiais || [])
  .map(e => ({ ...e, inicio: new Date(e.data) }))
  .filter(e => e.inicio.getTime() + 2 * 3600000 >= agora.getTime())
  .sort((a, b) => a.inicio - b.inicio)[0];
let proximo = proximaOcorrencia();
if (especial && especial.inicio < proximo.inicio) proximo = especial;

const hora = proximo.inicio.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
const diaSemana = formatar(proximo.inicio, { weekday: "long" });

// Link do Google Agenda (duração de 2h)
const fmt = d => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
const fim = new Date(proximo.inicio.getTime() + 2 * 3600000);
const linkAgenda = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(proximo.titulo)}` +
  `&dates=${fmt(proximo.inicio)}/${fmt(fim)}` +
  `&details=${encodeURIComponent(proximo.descricao)}` +
  `&location=${encodeURIComponent(proximo.local)}`;

cartao.innerHTML = `
  <div class="proximo__data">
    <span class="proximo__dia">${proximo.inicio.getDate()}</span>
    <span class="proximo__mes">${formatar(proximo.inicio, { month: "long" })}</span>
  </div>
  <div class="proximo__info">
    <h3>${esc(proximo.titulo)}</h3>
    <ul class="proximo__meta">
      <li>${diaSemana}, às ${hora.replace(":", "h")}</li>
      <li>${esc(proximo.local)}</li>
    </ul>
    <p>${esc(proximo.descricao)}</p>
    <div class="proximo__acoes">
      <a class="botao botao--contorno" href="${linkAgenda}" target="_blank" rel="noopener">Adicionar à agenda</a>
    </div>
  </div>`;

/* ---------- Lightbox ---------- */
const caixa = $("#lightbox");
const areaImagem = $("#lightbox-imagem");
const legenda = $("#lightbox-legenda");
let atual = 0;
let listaAtual = DADOS.galeria;

function mostrar(i) {
  atual = (i + listaAtual.length) % listaAtual.length;
  const item = listaAtual[atual];
  areaImagem.innerHTML = `<img src="${esc(item.src)}" alt="${esc(item.alt)}">`;
  areaImagem.classList.toggle("girada", !!item.girar);
  legenda.textContent = item.legenda || "";
}
function abrirLightbox(lista, i) { listaAtual = lista; mostrar(i); caixa.showModal(); }
$(".lightbox__fechar").addEventListener("click", () => caixa.close());
$(".lightbox__nav--ant").addEventListener("click", () => mostrar(atual - 1));
$(".lightbox__nav--prox").addEventListener("click", () => mostrar(atual + 1));
caixa.addEventListener("click", e => { if (e.target === caixa) caixa.close(); });
caixa.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") mostrar(atual - 1);
  if (e.key === "ArrowRight") mostrar(atual + 1);
});

/* ---------- Capa no celular: foto horizontal arrastável, começando pelo centro ---------- */
const fotoCapa = $(".abertura__foto");
const imgCapa = $("img", fotoCapa);
const dica = $(".abertura__dica");
function centralizarCapa() { fotoCapa.scrollLeft = (fotoCapa.scrollWidth - fotoCapa.clientWidth) / 2; }
if (imgCapa.complete) centralizarCapa(); else imgCapa.addEventListener("load", centralizarCapa, { once: true });
// O aviso "deslize" some quando a pessoa encosta na foto
fotoCapa.addEventListener("touchstart", () => dica.classList.add("sumir"), { once: true, passive: true });

/* ---------- Parallax leve: a foto da capa desce mais devagar que a página ---------- */
const aberturaEl = $(".abertura");
let esperando = false;
function aoRolar() {
  if (scrollY < innerHeight * 1.2) aberturaEl.style.setProperty("--py", `${scrollY * 0.18}px`);
  esperando = false;
}
if (!reduzirMovimento) addEventListener("scroll", () => { if (!esperando) { esperando = true; requestAnimationFrame(aoRolar); } }, { passive: true });

/* ---------- Revelar ao rolar (no fim, depois de criar todos os elementos) ---------- */
$$(".revelar").forEach(el => reduzirMovimento ? el.classList.add("visivel") : observador.observe(el));
