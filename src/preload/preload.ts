import { IpcRendererEvent } from "electron";
const { contextBridge, ipcRenderer } = require("electron");
import { IpcChannelType } from "./IpcChannelType";

export class ContextBridgeApi {
  constructor() {}

  public sendToMainHello = () => {
    return ipcRenderer
      .invoke(IpcChannelType.HELLO_TO_MAIN, {
        message: "hello to main, from renderer",
      })
      .then((result: string) => result)
      .catch((e: Error) => console.log(e));
  };

  public sendToRendererHello = (listener: (arg0: any) => any) => {
    ipcRenderer.on(
      IpcChannelType.HELLO_TO_RENDERER,
      (event: IpcRendererEvent, arg: any) => listener(arg)
    );
  };
}

contextBridge.exposeInMainWorld("api", new ContextBridgeApi());
