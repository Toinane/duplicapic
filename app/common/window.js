const path = require('path');
const { BrowserWindow } = require('electron');

class window {
    windowParams = {
        minWidth: 500,
        minHeight: 300
    };

    constructor(name) {
        this.name = name;

        this.securityParams = {
            webPreferences: {
                sandbox: true,
                preload: path.join(
                    __dirname,
                    '..',
                    'src',
                    this.name,
                    'preload.js'
                )
            }
        };
    }

    showBrowserWindow() {
        this.window = new BrowserWindow({
            ...this.securityParams,
            ...this.windowParams
        });

        this.window.loadURL(
            'file://' +
                path.join(
                    __dirname,
                    '..',
                    'src',
                    this.name,
                    `${this.name}.html`
                )
        );

        this.window.on('closed', this.closeWindow);

        this.events();

        return this.window;
    }

    closeWindow() {
        if (this.window) this.window.close();
        this.window = undefined;
    }

    getWindow() {
        if (this.window instanceof BrowserWindow) {
            return this.window;
        } else {
            return this.createWindow();
        }
    }

    events() {}

    sendEvent(channel, ...args) {
        if (!this.window) return;

        return this.window.webContents.send(channel, args);
    }
}

module.exports = window;
