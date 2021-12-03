const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    minimize: () => ipcRenderer.send("minimize"),
    close: () => ipcRenderer.send("close"),
    getDuplicates: () => ipcRenderer.invoke("get_duplicates"),
    showFile: (filepath) => ipcRenderer.send("show_file", filepath),
    deleteFile: (filepath) => ipcRenderer.send("delete_file", filepath),
    show: () => ipcRenderer.send("show"),
    restart: () => ipcRenderer.send("restart"),
});
