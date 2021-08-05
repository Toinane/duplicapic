async function init() {
    document
        .getElementById("traffic-minimize")
        .addEventListener("click", window.api.minimize);
    document
        .getElementById("traffic-close")
        .addEventListener("click", window.api.close);

    document.getElementById("scan").addEventListener("click", window.api.scan);

    document.getElementById("folder").addEventListener("click", async () => {
        const folder = await window.api.getFolder();
        console.log(folder);
    });
}

window.addEventListener("DOMContentLoaded", init);
