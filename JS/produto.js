// Trocar imagem principal ao clicar nas thumbnails
document.querySelectorAll(".thumbnail-item img").forEach(img => {
    img.addEventListener("click", function () {
        document.getElementById("main-product-image").src = this.src;

        document.querySelectorAll(".thumbnail-item").forEach(item => item.classList.remove("active"));
        this.parentElement.classList.add("active");
    });
});

// Tabs Descrição / Especificações
document.querySelectorAll(".description-tabs ul li a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelectorAll(".description-tabs li").forEach(li => li.classList.remove("active"));
        this.parentElement.classList.add("active");

        const target = this.getAttribute("href");

        document.querySelectorAll(".description-content").forEach(sec => sec.style.display = "none");
        document.querySelector(target).style.display = "block";
    });
});
