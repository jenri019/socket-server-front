import { inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from './websocket.service';
import type { Message } from '../interfaces/message.interface';
import type { Userlist } from '../interfaces/user.interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    _websocketService = inject(WebsocketService);
    chatroom = signal<string>('general');
    activeUsers = signal<Userlist[]>([]);
    privateMessages = signal<Record<string, any[]>>({});
    generalMessages = signal<Message[]>([]);

    constructor() {
        // Escuchar mensajes públicos
        this._websocketService.listen('new-message').subscribe((message: any) => {
            this.generalMessages.update(msgs => [...msgs, { from: message.from, body: message.body }]);
        });

        // Escuchar mensajes privados
        this._websocketService.listen('new-private-message').subscribe((message: any) => {
            const { from, body } = message;
            // Guarda el mensaje enviado en la conversación privada
            if (from in this.privateMessages())
                this.privateMessages.update(messages => ({
                    ...messages,
                    [from]: [...messages[from], { from, body }]
                }));
            else
                this.privateMessages.update(messages => ({
                    ...messages,
                    [from]: [{ from, body }]
                }));
        });

        // Escuchar cambios en los usuarios activos
        this._websocketService.listen('active-users').subscribe((users: any) => {
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
            const toUser = this.activeUsers().find(user => user.name === this.chatroom());
            if (!toUser) return;
            const toId = toUser.id;
            const toName = toUser.name;
            this._websocketService.emit('private-message', { ...payload, to: toId });

            // Guarda el mensaje enviado en la conversación privada
            if (toName in this.privateMessages()) {
                this.privateMessages.update(messages => ({
                    ...messages,
                    [toName]: [...messages[toName], payload]
                }));
            }
            else {
                this.privateMessages.update(messages => ({
                    ...messages,
                    [toName]: [payload]
                }));
            }
        }
    }

    emitActiveUsers() {
        this._websocketService.emit('get-users');
    }
}
