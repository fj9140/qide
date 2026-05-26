import { SystemAPI } from "./system-api";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { WebSocketMessage } from "./interface";

export class FuturesWebsocket {

  /**
   * WebSocket 连接实例
   */
  private _ws:WebSocketSubject<WebSocketMessage>;

  systemAPI:SystemAPI

  constructor(contractType:'btc'|'usdt'){
    this._ws=webSocket(`wss://fx-ws.gateio.ws/v4/ws/${contractType}`) // 连接到 WebSocket 服务器
    this.systemAPI=new SystemAPI(this._ws)
  }


}
