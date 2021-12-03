function showDuplicates(duplicates) {
    const root = document.getElementById("root");
    const button = document.createElement("button");
    button.textContent = "Make a new scan";
    button.addEventListener("click", () => window.api.restart());

    if (duplicates.length == 0) {
        const p = document.createElement("p");
        p.textContent =
            "Unable to found any duplicates in your folder. Looks great!";
        root.appendChild(p);
        root.appendChild(button);
    }

    duplicates.map((dupli) => {
        const section = document.createElement("section");
        const h1 = document.createElement("h1");
        section.classList.add("duplicate");
        h1.innerText = dupli[0].file;
        const aside = document.createElement("aside");

        dupli.map((dup) => {
            const showFileButton = document.createElement("p");
            const deleteFileButton = document.createElement("p");
            showFileButton.innerText = "Show File";
            deleteFileButton.innerText = "Delete File";
            showFileButton.addEventListener("click", () =>
                window.api.showFile(dup.filepath)
            );
            deleteFileButton.addEventListener("click", () =>
                window.api.deleteFile(dup.filepath)
            );

            const innerSection = document.createElement("section");
            const img = document.createElement("img");
            const p = document.createElement("p");
            const innerAside = document.createElement("aside");
            innerSection.classList.add("file");
            img.src = dup.filepath;
            p.innerText = dup.filepath;
            innerAside.appendChild(showFileButton);
            innerAside.appendChild(deleteFileButton);
            innerSection.appendChild(img);
            innerSection.appendChild(p);
            innerSection.appendChild(innerAside);
            aside.appendChild(innerSection);
        });

        section.appendChild(h1);
        section.appendChild(aside);
        root.appendChild(section);
        root.appendChild(button);
    });
}

async function init() {
    document
        .getElementById("traffic-minimize")
        .addEventListener("click", window.api.minimize);
    document
        .getElementById("traffic-close")
        .addEventListener("click", window.api.close);

    let duplicates = await window.api.getDuplicates();
    duplicates = Object.values(duplicates);
    console.log("get duplicates", duplicates);
    showDuplicates(duplicates);
    window.api.show();
}

window.addEventListener("DOMContentLoaded", init);
