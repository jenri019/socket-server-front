import { effect, inject, Injectable, signal } from '@angular/core';
import { io } from "socket.io-client";
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    socketStatus = signal<boolean>(false);
    constructor() {
        const socket = io(environment.wsUrl, {
            transports: ['websocket'] // Forzar el uso de WebSocket
        });

        socket.on('connect', () => {
            console.log('Socket connected');
            this.socketStatus.set(true);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
            this.socketStatus.set(false);
        });
    }

}
