document.addEventListener("DOMContentLoaded", () => {
    const lines = document.querySelectorAll(".terminal-box p");
    
    lines.forEach((line, i) => {
        line.style.opacity = "0";
        setTimeout(() => {
            line.style.transition = "0.4s";
            line.style.opacity = "1";
        }, i * 400);
    });
});