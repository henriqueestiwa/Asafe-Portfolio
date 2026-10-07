const carrosseis = document.querySelectorAll(".servicoimagem");

carrosseis.forEach(function(carrossel) {

    const fotos = carrossel.querySelectorAll("img");
    
    let fotoAtual = 0;

    function trocarFoto(){

            fotos[fotoAtual].classList.remove("ativa");
            fotoAtual = fotoAtual +1;
        
            if (fotoAtual === fotos.length) {
                fotoAtual = 0;
            }
        
            fotos[fotoAtual].classList.add("ativa");
    }
    setInterval(trocarFoto, 3500);
});

const botoesCopiar = document.querySelectorAll(".copiar")

botoesCopiar.forEach((botao) => {
    botao.addEventListener("click", () => {

        const texto = botao.dataset.texto;

        navigator.clipboard.writeText(texto);

        botao.textContent = "Copiado ✓";
    })
});

const fotos = [
    {
        src: "assets/eventos/IMG 01.jpg",
        categoria: "eventos"
    },
    {
        src: "assets/eventos/IMG 02.jpg",
        categoria: "eventos"
    },
    {
        src: "assets/eventos/IMG 03.jpg",
        categoria: "eventos"
    },

    {
        src: "assets/retratos/IMG 01.jpg",
        categoria: "retratos"
    },
    {
        src: "assets/retratos/IMG 02.jpg",
        categoria: "retratos"
    },
    {
        src: "assets/retratos/IMG 03.jpg",
        categoria: "retratos"
    },

    {
        src: "assets/gastronomia/IMG 01.jpg",
        categoria: "gastronomia"
    },
    {
        src: "assets/gastronomia/IMG 02.jpg",
        categoria: "gastronomia"
    },
    {
        src: "assets/gastronomia/IMG 03.jpg",
        categoria: "gastronomia"
    }
];

const galeria = document.querySelector(".galeria");
const botaoVerMais = document.querySelector(".ver-mais");
const botoesFiltro = document.querySelectorAll(".filtro");

// O script também é usado na página inicial, que não possui galeria.
if (galeria && botaoVerMais) {
    const limiteInicial = 8;
    const categorias = ["todos", "eventos", "retratos", "gastronomia"];
    const filtroURL = new URLSearchParams(window.location.search).get("filtro");
    let filtroAtual = categorias.includes(filtroURL) ? filtroURL : "todos";
    let galeriaExpandida = false;

    const visualizador = document.querySelector(".visualizador");
    const imagemAmpliada = visualizador.querySelector(".visualizador-imagem");
    const legenda = visualizador.querySelector(".visualizador-legenda");
    const anterior = visualizador.querySelector(".visualizador-anterior");
    const proxima = visualizador.querySelector(".visualizador-proxima");
    let fotosDoVisualizador = [];
    let indiceAtual = 0;
    let inicioToque = null;

    function atualizarVisualizador() {
        const total = fotosDoVisualizador.length;
        const foto = fotosDoVisualizador[indiceAtual];
        imagemAmpliada.src = foto.src;
        imagemAmpliada.alt = "Fotografia de " + foto.categoria;
        legenda.textContent = foto.categoria.toUpperCase() + " · " + (indiceAtual + 1) + " / " + total;
        anterior.querySelector("img").src = fotosDoVisualizador[(indiceAtual - 1 + total) % total].src;
        proxima.querySelector("img").src = fotosDoVisualizador[(indiceAtual + 1) % total].src;
        anterior.hidden = total <= 1;
        proxima.hidden = total <= 1;
    }

    function navegar(direcao) {
        indiceAtual = (indiceAtual + direcao + fotosDoVisualizador.length) % fotosDoVisualizador.length;
        atualizarVisualizador();
    }

    function abrirFoto(indice, fotosFiltradas) {
        // Navega por todas as fotos do filtro, inclusive além das primeiras oito.
        fotosDoVisualizador = fotosFiltradas;
        indiceAtual = indice;
        atualizarVisualizador();
        visualizador.showModal();
        document.body.classList.add("visualizador-aberto");
    }

    anterior.addEventListener("click", () => navegar(-1));
    proxima.addEventListener("click", () => navegar(1));
    visualizador.querySelector(".visualizador-fechar").addEventListener("click", () => visualizador.close());
    visualizador.addEventListener("close", () => {
        document.body.classList.remove("visualizador-aberto");
        inicioToque = null;
    });
    visualizador.addEventListener("click", (evento) => {
        if (evento.target === visualizador) visualizador.close();
    });
    visualizador.addEventListener("keydown", (evento) => {
        if (evento.key === "ArrowLeft" || evento.key === "ArrowRight") {
            evento.preventDefault();
            navegar(evento.key === "ArrowLeft" ? -1 : 1);
        }
    });
    imagemAmpliada.addEventListener("touchstart", (evento) => {
        inicioToque = evento.touches.length === 1 ? evento.touches[0].clientX : null;
    }, { passive: true });
    imagemAmpliada.addEventListener("touchend", (evento) => {
        if (inicioToque === null) return;
        const distancia = evento.changedTouches[0].clientX - inicioToque;
        if (Math.abs(distancia) > 50) navegar(distancia < 0 ? 1 : -1);
        inicioToque = null;
    }, { passive: true });
    imagemAmpliada.addEventListener("touchcancel", () => { inicioToque = null; });

    function mostrarFotos() {
        // Primeiro filtra; depois aplica o limite da galeria recolhida.
        const fotosFiltradas = filtroAtual === "todos"
            ? fotos
            : fotos.filter((foto) => foto.categoria === filtroAtual);
        const fotosVisiveis = galeriaExpandida
            ? fotosFiltradas
            : fotosFiltradas.slice(0, limiteInicial);

        galeria.innerHTML = "";

        fotosVisiveis.forEach((foto, indice) => {
            const item = document.createElement("button");
            const imagem = document.createElement("img");

            item.classList.add("galeria-item");
            item.type = "button";
            item.setAttribute("aria-label", "Ampliar fotografia de " + foto.categoria + " " + (indice + 1));
            item.addEventListener("click", () => abrirFoto(indice, fotosFiltradas));
            imagem.src = foto.src;
            imagem.alt = "Fotografia de " + foto.categoria;

            item.appendChild(imagem);
            galeria.appendChild(item);
        });

        botoesFiltro.forEach((botao) => {
            const ativo = botao.dataset.filtro === filtroAtual;
            botao.classList.toggle("ativo", ativo);
            botao.setAttribute("aria-pressed", String(ativo));
        });

        botaoVerMais.hidden = fotosFiltradas.length <= limiteInicial;
        botaoVerMais.textContent = galeriaExpandida ? "VER MENOS" : "VER MAIS";
    }

    botoesFiltro.forEach((botao) => {
        botao.addEventListener("click", () => {
            filtroAtual = botao.dataset.filtro;
            galeriaExpandida = false;
            mostrarFotos();
        });
    });

    botaoVerMais.addEventListener("click", () => {
        galeriaExpandida = !galeriaExpandida;
        mostrarFotos();
    });

    mostrarFotos();
}
