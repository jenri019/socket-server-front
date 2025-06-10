import { inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { map, Observable } from 'rxjs';
import type { Message } from '../interfaces/message.interface';
import type { Userlist } from '../interfaces/user.interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    _websocketService = inject(WebsocketService);
    chatroom = signal<string>('priavte');
    activeUsers = signal<Userlist[]>([]);
    privateMessages = signal<Message[]>([]);
    generalMessages = signal<Message[]>([]);

    constructor() {
        // Escuchar mensajes públicos
        this._websocketService.listen('new-message').subscribe((message: any) => {
            this.generalMessages.update(msgs => [...msgs, { from: message.from, body: message.body }]);
        });

        // Escuchar mensajes privados
        this._websocketService.listen('new-private-message').subscribe((message: any) => {
            console.log('Private message received:', message);
            this.privateMessages.update(msgs => [...msgs, { from: message.from, body: message.body }]);
        });

        // Escuchar cambios en los usuarios activos
        this._websocketService.listen('active-users').subscribe((users: any) => {
            console.log('Active users:', users);
            this.activeUsers.set(users);
        });
    }

    sendMessage(message: string) {
        const payload = {
            from: this._websocketService.getUser(),
            body: message,
        };
        if (this.chatroom() === 'general') {
            this._websocketService.emit('message', payload);
        } else {
            console.log('Sending private message to:', this.activeUsers()[0].id);
            this._websocketService.emit('private-message', { ...payload, to: this.activeUsers()[0].id });
        }
    }

    emitActiveUsers() {
        this._websocketService.emit('get-users');
    }
}
