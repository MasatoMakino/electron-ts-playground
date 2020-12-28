const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  sendToMainHello: () => {
    return ipcRenderer
      .invoke("hello-to-main")
      .then((result) => result)
      .catch((e) => console.log(e));
  },
  sendToRendererHello: (listener) => {
    ipcRenderer.on("hello-to-renderer", (event, arg) => listener(arg));
  },
});
