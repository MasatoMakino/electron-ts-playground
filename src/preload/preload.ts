import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { IpcChannelType } from "./IpcChannelType";

export class ContextBridgeApi {
  public static readonly API_KEY = "api";

  constructor() {}

  public sendToMainHello = (): Promise<string | void> => {
    return ipcRenderer
      .invoke(IpcChannelType.HELLO_TO_MAIN, {
        message: "hello to main, from renderer",
      })
      .then((result: string) => result)
      .catch((e: Error) => console.log(e));
  };

  /**
   *
   * @param rendererListener
   */
  public onSendToRendererHello = (rendererListener: (arg0: string) => void) => {
    ipcRenderer.on(
      IpcChannelType.HELLO_TO_RENDERER,
      (event: IpcRendererEvent, arg: string) => {
        rendererListener(arg);
      }
    );
  };
}

contextBridge.exposeInMainWorld(
  ContextBridgeApi.API_KEY,
  new ContextBridgeApi()
);
