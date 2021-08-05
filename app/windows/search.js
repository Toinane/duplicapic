const { ipcMain, app } = require("electron");
const window = require("../common/window");

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
    }
}

module.exports = new search();
