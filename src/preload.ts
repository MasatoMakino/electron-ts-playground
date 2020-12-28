const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  sendToMainHello: () => {
    return ipcRenderer
      .invoke("hello-to-main", { message: "hello to main, from renderer" })
      .then((result: any) => result)
      .catch((e: any) => console.log(e));
  },
  sendToRendererHello: (listener: (arg0: any) => any) => {
    ipcRenderer.on("hello-to-renderer", (event: any, arg: any) =>
      listener(arg)
    );
  },
});
