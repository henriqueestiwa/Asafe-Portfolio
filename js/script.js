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