const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    loadPage: () => ipcRenderer.invoke("load-example"),
});
