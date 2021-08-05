const { ipcMain, app } = require("electron");
const window = require("../common/window");

class example extends window {
    constructor() {
        super("example");
    }

    events() {
        ipcMain.handle("load-example", () => {
            console.log("received event from renderer");

            return app.getVersion();
        });
    }
}

module.exports = new example();
