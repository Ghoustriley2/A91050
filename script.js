document.addEventListener("DOMContentLoaded", () => {

const menu = document.getElementById("menu");
const toggle = document.getElementById("menuToggle");

/* открыть / закрыть меню */
toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});

/* закрытие при клике вне меню */
document.addEventListener("click", (e) => {
    if(menu.classList.contains("active")){
        if(!menu.contains(e.target) && e.target !== toggle){
            menu.classList.remove("active");
        }
    }
});

/* НАВИГАЦИЯ */
menu.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {

        const go = btn.dataset.go;

        if(go === "core"){
            window.location.href = "core_v0.3/core.html";
            return;
        }

        if(go === "archive"){
            window.location.href = "archive_aver/index.html";
            return;
        }

        if(go === "links"){
            window.location.href = "links_aver/index.html";
            return;
        }

        if(go === "projects"){
            window.location.href = "projects_aver/index.html";
            return;
        }

        menu.classList.remove("active");
    });
});

});