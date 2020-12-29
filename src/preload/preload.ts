import { IpcRendererEvent } from "electron";

const { contextBridge, ipcRenderer } = require("electron");
import {IpcChannelType} from "./IpcChannelType";

contextBridge.exposeInMainWorld("api", {
  sendToMainHello: () => {
    return ipcRenderer
      .invoke(IpcChannelType.HELLO_TO_MAIN, { message: "hello to main, from renderer" })
      .then((result: any) => result)
      .catch((e: any) => console.log(e));
  },
  sendToRendererHello: (listener: (arg0: any) => any) => {
    ipcRenderer.on("hello-to-renderer", (event: IpcRendererEvent, arg: any) =>
      listener(arg)
    );
  },
});
