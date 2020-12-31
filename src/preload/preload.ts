import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { IpcChannelType } from "./IpcChannelType";

export class ContextBridgeApi {
  public static readonly API_KEY = "api";

  constructor() {}

  public sendToMainHello = () => {
    return ipcRenderer
      .invoke(IpcChannelType.HELLO_TO_MAIN, {
        message: "hello to main, from renderer",
      })
      .then((result: string) => result)
      .catch((e: Error) => console.log(e));
  };

  public onSendToRendererHello = (rendererListener: (arg0: any) => void) => {
    ipcRenderer.on(
      IpcChannelType.HELLO_TO_RENDERER,
      (event: IpcRendererEvent, arg: any) => {
        rendererListener(arg);
      }
    );
  };
}

contextBridge.exposeInMainWorld(
  ContextBridgeApi.API_KEY,
  new ContextBridgeApi()
);
