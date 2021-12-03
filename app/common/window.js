const path = require("path");
const { BrowserWindow } = require("electron");

class window {
    windowProps = {
        minWidth: 500,
        minHeight: 300,
        show: false,
    };

    constructor(name) {
        this.name = name;

        this.securityProps = {
            webPreferences: {
                sandbox: true,
                preload: path.join(
                    __dirname,
                    "..",
                    "src",
                    this.name,
                    "preload.js"
                ),
            },
        };
    }

    showBrowserWindow() {
        this.window = new BrowserWindow({
            ...this.securityProps,
            ...this.windowProps,
        });

        this.window.loadURL(
            "file://" +
                path.join(
                    __dirname,
                    "..",
                    "src",
                    this.name,
                    `${this.name}.html`
                )
        );

        this.showWindow(this.window);
        this.window.on("closed", this.closeWindow);

        this.events();

        return this.window;
    }

    showWindow(window) {
        this.window.once("ready-to-show", window.show);
    }

    closeWindow() {
        if (this.window) this.window.close();
        this.window = undefined;
    }

    getWindow() {
        if (this.window instanceof BrowserWindow) {
            return this.window;
        } else {
            return this.showBrowserWindow();
        }
    }

    events() {}

    sendEvent(channel, ...args) {
        if (!this.window) return;

        return this.window.webContents.send(channel, args);
    }
}

module.exports = window;
