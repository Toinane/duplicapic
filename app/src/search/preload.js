const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    minimize: () => ipcRenderer.send("minimize"),
    close: () => ipcRenderer.send("close"),
    scan: (folder) => ipcRenderer.send("scan", folder),
    getFolder: () => ipcRenderer.invoke("get_folder"),
    onUpdate: (cb) => ipcRenderer.on("update", cb),
});
