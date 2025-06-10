import { inject, Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { map, Observable } from 'rxjs';
import type { Message } from '../interfaces/message.interface';
import type { Userlist } from '../interfaces/user.interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    _websocketService = inject(WebsocketService);

    sendMessage(message: string) {
        const payload = {
            from: this._websocketService.getUser(),
            body: message,
        };
        this._websocketService.emit('message', payload);
    }

    getMessages(): Observable<Message> {
        return this._websocketService.listen('new-message').pipe(
            map((data: any) => (
                {
                    from: data.from,
                    body: data.body
                }
            ))
        );
    }

    getPrivateMessages(): Observable<Message> {
        return this._websocketService.listen('private-message').pipe(
            map((data: any) => (
                {
                    from: data.from,
                    body: data.body
                }
            ))
        );
    }

    getActiveUsers(): Observable<Userlist[]> {
        return this._websocketService.listen('active-users').pipe(
            map((users: any) => users.map((user: any) => ({
                id: user.id,
                name: user.name,
                room: user.room
            })))
        );
    }

    emitActiveUsers() {
        this._websocketService.emit('get-users');
    }
}
