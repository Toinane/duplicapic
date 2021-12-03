const { ipcMain, dialog } = require("electron");
const scanner = require("../common/scanner");
const window = require("../common/window");

const duplicatesWindow = require("./duplicates");

class search extends window {
    windowProps = {
        width: 550,
        height: 230,
        resizable: false,
        frame: false,
        show: false,
    };

    constructor() {
        super("search");
    }

    events() {
        ipcMain.on("minimize", () => this.window.minimize());
        ipcMain.on("close", () => this.closeWindow());
        ipcMain.on("scan", (_, folder) => this.resolveScan(folder));
        ipcMain.handle("get_folder", async () => {
            const { filePaths } = await dialog.showOpenDialog({
                properties: ["openDirectory"],
            });

            return filePaths[0];
        });

        this.getWindow().on("closed", () => {
            ipcMain.removeHandler("get_folder");
        });
    }

    async resolveScan(folder) {
        console.log("start scan:", folder);
        const duplicates = await scanner.getDuplicateFiles(folder);
        const dupliWin = new duplicatesWindow(this, duplicates);
        dupliWin.showBrowserWindow();
    }
}

module.exports = new search();
