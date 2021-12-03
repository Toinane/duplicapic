const { ipcMain, shell, dialog } = require("electron");
const fs = require("fs");
const window = require("../common/window");

class duplicates extends window {
    windowProps = {
        minWidth: 700,
        minHeight: 400,
        width: 1030,
        height: 650,
        frame: false,
        show: false,
    };

    constructor(searchWindow, duplicates) {
        super("duplicates");

        this.searchWindow = searchWindow;
        this.duplicates = duplicates;
    }

    showWindow() {}

    events() {
        ipcMain.handle("get_duplicates", () => this.duplicates);
        ipcMain.on("show", () => {
            this.window.show();
            this.searchWindow.closeWindow();
        });
        ipcMain.on("minimize", () => this.getWindow().minimize());
        ipcMain.on("close", () => this.closeWindow());
        ipcMain.on("show_file", (_, filepath) => {
            console.log("show file", filepath);
            shell.showItemInFolder(filepath);
        });
        ipcMain.on("delete_file", (_, filepath) => {
            const res = dialog.showMessageBoxSync(this.window, {
                message: "Are you sure to delete this file?",
                type: "warning",
                buttons: ["Delete file", "No keep it!"],
                defaultId: 1,
            });

            if (res === 0 && fs.existsSync(filepath)) {
                try {
                    fs.unlinkSync(filepath);
                } catch (error) {
                    console.log(error);
                }
            }
        });
        ipcMain.on("restart", () => {
            this.closeWindow();
            this.searchWindow.showBrowserWindow();
        });

        this.getWindow().on("closed", () => {
            ipcMain.removeHandler("get_duplicates");
        });
    }
}

module.exports = duplicates;
