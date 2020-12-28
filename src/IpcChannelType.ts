/**
 * ipc通信用チャネル名
 */
export enum IpcChannelType {
  HELLO_TO_MAIN = "hello-to-main",
  HELLO_TO_RENDERER = "hello-to-renderer",
}

export interface HelloToMainMessage {
    name?:string
}