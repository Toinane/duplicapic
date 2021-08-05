async function loadPage() {
    const message = await window.api.loadPage();
    document.querySelector("span").innerHTML = message;
}

window.addEventListener("DOMContentLoaded", loadPage);
