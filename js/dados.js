/* =====================================================
   CONTEÚDO DO SITE — é aqui que você atualiza tudo.
   Não precisa mexer no resto do código.
   ===================================================== */

const DADOS = {

  // Links de contato
  contato: {
    whatsapp: "https://wa.me/5583996543395",
    instagram: "https://www.instagram.com/cll.liora/"
  },

  // Encontro semanal: o site calcula sozinho a data da próxima quinta-feira.
  encontro: {
    diaSemana: 4,            // 0 = domingo ... 4 = quinta-feira
    hora: "19:30",
    duracaoHoras: 2,
    titulo: "Célula Liora",
    local: "Portal do Sol",
    descricao: "Sua quinta tá livre? A gente guardou um lugar pra você (e pra quem você quiser trazer)."
  },
  // Encontros especiais fora da quinta (opcional). Aparecem no lugar da próxima quinta, se forem antes dela.
  // Data no formato AAAA-MM-DDTHH:MM. Ex.: { titulo: "Noite especial", data: "2026-12-20T19:00", local: "Portal do Sol", descricao: "..." }
  especiais: [],

  // Liderança: dois perfis. "posicao" = ponto de foco do recorte da foto (ex.: "50% 30%").
  lideranca: [
    {
      papel: "Líder",
      nome: "Beatriz Carneiro",
      descricao: "Tem 19 anos e faz parte da Primeira Igreja Batista desde 2020. Lidera a Liora com o desejo de que cada jovem encontre aqui um lugar para pertencer e crescer na fé.",
      foto: "assets/img/lider-01.webp",
      posicao: "50% 35%"
    },
    {
      papel: "Líder em treinamento",
      nome: "Beatriz Soares",
      descricao: "Tem 20 anos e faz parte da Primeira Igreja Batista desde 2024. Caminha ao lado da liderança, aprendendo a cuidar e a acolher cada pessoa que chega à Liora.",
      foto: "assets/img/lider-02.webp",
      posicao: "48% 35%"
    }
  ],

  // Mural vivo: vídeos que tocam no próprio site (.mp4 em assets/video/; vídeo em pé fica melhor).
  // "capa" = imagem mostrada antes do play (opcional).
  videos: [
    { src: "assets/video/louvor.mp4", capa: "assets/video/louvor-capa.webp", legenda: "Louvor" },
    { src: "assets/video/quebra-gelo.mp4", capa: "assets/video/quebra-gelo-capa.webp", legenda: "Quebra-gelo" },
    { src: "assets/video/estudo.mp4", capa: "assets/video/estudo-capa.webp", legenda: "Estudo" }
  ],

  // FRONTSTAGE: as 6 fotos do mosaico, nesta ordem.
  // Espaços: 1 e 5 = verticais (arco) | 2 e 6 = horizontais largos | 3 e 4 = verticais menores.
  // "posicao": ponto de foco do recorte (ex.: "50% 30%" = centro, um pouco acima).
  galeria: [
    { "src": "assets/img/lideres-01.webp", "alt": "As duas líderes da Liora abraçadas, sorrindo, em frente ao painel da célula", "legenda": "Líderes", "posicao": "50% 30%" },
    { "src": "assets/img/fotoabertura.jpeg", "alt": "A célula Liora reunida, abraçada e sorrindo, em frente ao painel com a lamparina", "legenda": "Festa da Multiplicação", "posicao": "50% 38%" },
    { "src": "assets/img/amigas-02.webp.jpeg", "alt": "Duas amigas da célula abraçadas e sorrindo em frente a um quadro azul", "legenda": "Biusa e Elinne", "posicao": "50% 30%" },
    { "src": "assets/img/vitrine-liora-01.webp.jpeg", "alt": "Letras de papel formando Célula Liora sobre um vidro, com várias fotos das meninas coladas embaixo", "legenda": "Primeira célula", "posicao": "50% 35%" },
    { "src": "assets/img/acampamento-01.webp.jpeg", "alt": "Seis jovens da célula abraçadas, sorrindo, em uma ponte de madeira à beira de um lago no acampamento", "legenda": "Acampamento", "posicao": "50% 55%" },
    { "src": "assets/img/juntas-culto-01.webp", "alt": "Cinco jovens da célula juntas, sorrindo, com um balão dourado", "legenda": "Culto", "posicao": "38% 50%" }
  ],

  // RODAPÉ: as 5 fotos da faixa lá embaixo (os espaços são verticais, prefira fotos em pé).
  rodape: [
    "assets/img/aleatoria.jpeg",
    "assets/img/asquatro.jpeg",
    "assets/img/elinneyo.jpeg",
    "assets/img/iasyo.jpeg",
    "assets/img/primeiracell.jpeg"
  ],

  // BACKSTAGE: fotos da galeria (não repetir as do Frontstage).
  // Cada foto ocupa um espaço no formato dela: vertical em espaço vertical, horizontal em horizontal.
  // "proporcao" = largura ÷ altura (ex.: 0.67 vertical, 1.5 horizontal). Se faltar, o site descobre sozinho.
  // "girar": true => a foto foi salva deitada; o site a mostra girada 90° (em pé).
  backstage: [
    { "src": "assets/img/aleatoria.jpeg", "alt": "Selfie de uma jovem de óculos sorrindo, com amigas posando ao fundo", "legenda": "", "proporcao": 0.667 },
    { "src": "assets/img/asquatro.jpeg", "alt": "Quatro amigas abraçadas em frente a uma cortina de festa azul", "legenda": "Festa da Multiplicação", "proporcao": 1.5 },
    { "src": "assets/img/elinneyo.jpeg", "alt": "Duas amigas abraçadas e sorrindo, uma com um traço azul na testa, em frente ao painel da Liora", "legenda": "Abraço apertado", "proporcao": 0.667 },
    { "src": "assets/img/noite-pizza-04.webp", "alt": "Selfie do grupo reunido no sofá, todas sorrindo", "legenda": "Cinema Liora", "proporcao": 1.778 },
    { "src": "assets/img/aniveyo.jpeg", "alt": "Selfie de uma jovem com o grupo ao fundo, em volta de uma mesa com balões e bolo de aniversário", "legenda": "Aniversário", "proporcao": 1.778 },
    { "src": "assets/img/iasyo.jpeg", "alt": "Jovem carregando uma amiga no colo, as duas rindo", "legenda": "", "proporcao": 0.667 },
    { "src": "assets/img/noite-hamburguer-01.webp", "alt": "Duas jovens da célula, uma segurando um prato e a outra fazendo joinha, diante de uma mesa cheia de hambúrgueres crus", "legenda": "Noite do hambúrguer", "proporcao": 1.499 },
    { "src": "assets/img/yoias.jpeg", "alt": "Jovem carregando uma amiga no colo na sala, fazendo sinal de paz", "legenda": "", "proporcao": 1.5 },
    { "src": "assets/img/abraco-01.webp", "alt": "Duas jovens se abraçando e rindo em frente ao painel da Liora", "legenda": "Abraço", "proporcao": 1.501 },
    { "src": "assets/img/primeiracell.jpeg", "alt": "As meninas reunidas em volta de uma mesa de jantar em um salão iluminado", "legenda": "Primeira célula", "proporcao": 0.666 },
    { "src": "assets/img/noite-pizza-01.webp", "alt": "Jovem fazendo careta com uma fatia de pizza na mão, com uma amiga rindo ao fundo", "legenda": "Hora da pizza", "proporcao": 1.778 },
    { "src": "assets/img/noite-hamburguer-03.webp", "alt": "Jovem rindo e mostrando uma frigideira com hambúrgueres de queijo, com uma amiga cozinhando ao fundo", "legenda": "Mão na massa", "proporcao": 1.501 },
    { "src": "assets/img/noite-pizza-03.webp", "alt": "Três amigas da célula abraçadas, sorrindo, em uma sala acolhedora", "legenda": "Noite da pizza", "proporcao": 1.778 },
    { "src": "assets/img/biusaeelinne.jpeg", "alt": "Duas amigas abraçadas, rindo", "legenda": "Biusa e Elinne", "proporcao": 0.5625, "girar": true }
  ]
};
