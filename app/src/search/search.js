async function init() {
    document
        .getElementById("traffic-minimize")
        .addEventListener("click", window.api.minimize);
    document
        .getElementById("traffic-close")
        .addEventListener("click", window.api.close);
}

window.addEventListener("DOMContentLoaded", init);
