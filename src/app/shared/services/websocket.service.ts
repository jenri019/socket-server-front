import { Injectable, signal } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    socket: Socket;
    socketStatus = signal<boolean>(false);

    constructor() {
        this.socket = io(environment.wsUrl, {
            transports: ['websocket']
        });
        this.checkStatus();
    }

    checkStatus() {
        this.socket.on('connect', () => {
            console.log('Socket connected');
            this.socketStatus.set(true);
        });

        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
            this.socketStatus.set(false);
        });
    }

    emit(event: string, payload?: any, callback?: Function) {
        console.log('Emitting mensaje');
        this.socket.emit(event, payload, callback)
    }
}
