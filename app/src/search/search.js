let folderToScan;

async function init() {
    const scanEl = document.getElementById("scan");

    document
        .getElementById("traffic-minimize")
        .addEventListener("click", window.api.minimize);
    document
        .getElementById("traffic-close")
        .addEventListener("click", window.api.close);

    scanEl.addEventListener("click", () => {
        document.body.classList.add("loading");
        window.api.scan(folderToScan);
    });

    document.getElementById("folder").addEventListener("click", async () => {
        folderToScan = await window.api.getFolder();
        document.getElementById("text").innerText = folderToScan;
        scanEl.removeAttribute("disabled");
    });
}

window.addEventListener("DOMContentLoaded", init);
