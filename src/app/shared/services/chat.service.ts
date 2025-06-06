import { inject, Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    _websocketService = inject(WebsocketService);

    sendMessage(message: string) {
        const payload = {
            from: 'user',
            body: message,
        };
        this._websocketService.emit('message', payload);
    }

    getMessages() {
        return this._websocketService.listen('new-message');
    }
}
