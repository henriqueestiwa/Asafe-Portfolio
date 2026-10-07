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

let limiteFotos = 8;
let galeriaExpandida = false;

function mostrarFotos() {

    galeria.innerHTML = "";

    const fotosVisiveis = fotos.slice(0, limiteFotos);

    fotosVisiveis.forEach((foto) => {

    const item = document.createElement("div");
    const imagem = document.createElement("img");

    item.classList.add("galeria-item");

    imagem.src = foto.src;

    item.appendChild(imagem);
    galeria.appendChild(item);

})};

mostrarFotos();

botaoVerMais.addEventListener("click", () => {

    if (galeriaExpandida) {

        limiteFotos = 8;
        botaoVerMais.textContent = "VER MAIS";
        galeriaExpandida = false;

    } else {

        limiteFotos = fotos.length;
        botaoVerMais.textContent = "VER MENOS";
        galeriaExpandida = true;

    }

    mostrarFotos();
});