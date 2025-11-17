document.addEventListener("DOMContentLoaded", () => {

    const itens = document.querySelectorAll('.gallery-item');

    // IDENTIFICAR PÁGINA PELO NOME DO ARQUIVO
    let arquivo = window.location.pathname.split("/").pop();
    let paginaPrefixo = arquivo.replace(/\.[^/.]+$/, "") || "index";

    // CARREGAR IMAGENS SALVAS
    itens.forEach((item, index) => {
        const img = item.querySelector("img");
        const input = item.querySelector(".image-input");

        const imagemSalva = localStorage.getItem(`${paginaPrefixo}_img_${index}`);

        if (imagemSalva) {
            img.src = imagemSalva;
            img.style.filter = "grayscale(0%)";
        }

        img.addEventListener("click", () => input.click());

        input.addEventListener("change", evento => {
            const file = evento.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                const base64 = e.target.result;
                img.src = base64;
                img.style.filter = "grayscale(0%)";

                localStorage.setItem(`${paginaPrefixo}_img_${index}`, base64);
            };
            reader.readAsDataURL(file);
        });
    });

    // BOTÃO RESET
    const btnReset = document.getElementById("resetGallery");
    const model = document.getElementById("modelReset");
    const cancelar = document.getElementById("cancelReset");
    const confirmar = document.getElementById("confirmReset");
    const toast = document.getElementById("toastMsg");

    btnReset.addEventListener("click", () => {
        model.style.display = "flex";
    });

    cancelar.addEventListener("click", () => {
        model.style.display = "none";
    });

    confirmar.addEventListener("click", () => {

        // apagar apenas a página atual
        const chaves = Object.keys(localStorage).filter(k => k.startsWith(paginaPrefixo));
        chaves.forEach(k => localStorage.removeItem(k));

        model.style.display = "none";

        toast.style.display = "block";
        setTimeout(() => {
            toast.style.display = "none";
            location.reload();
        }, 1500);
    });

});
