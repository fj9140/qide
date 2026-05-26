import { filter } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WebSocketMessage } from './interface';

export class SystemAPI {
  constructor(private _$ws: WebSocketSubject<WebSocketMessage>) {}

  ping() {
    this._$ws.next({
      time: Date.now(),
      channel: 'futures.ping',
    });
    return this._$ws.pipe(
      filter((msg: WebSocketMessage) => {
        return msg.channel === 'futures.pong';
      }),
    );
  }
}
