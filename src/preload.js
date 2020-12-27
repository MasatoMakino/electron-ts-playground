const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  sendToMainHello: () => {
    ipcRenderer
      .invoke("hello-to-main")
      .then((result) => result)
      .catch((e) => console.log(e));
  },
  sendToRendererHello: () => {
    ipcRenderer.on("hello-to-renderer", (event, arg) => listener(arg));
  },
});
