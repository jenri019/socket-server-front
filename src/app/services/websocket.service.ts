import { inject, Injectable, signal } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface User {
    username: string;
    room: string;
}

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private router = inject(Router);
    socket: Socket;
    socketStatus = signal<boolean>(false);
    private user = signal<string | null>(null);

    constructor() {
        this.socket = io(environment.wsUrl, {
            transports: ['websocket']
        });
        this.loadStorage();
        this.checkStatus();
    }

    checkStatus() {
        this.socket.on('connect', () => {
            this.socketStatus.set(true);
            // Si hay usuario almacenado, vuelve a loguearlo
            const username = this.user();
            if (username) {
                this.loginWs(username);
            }
        });

        this.socket.on('disconnect', () => {
            //console.log('Socket disconnected');
            this.socketStatus.set(false);
        });
    }

    emit(event: string, payload?: any, callback?: Function) {
        this.socket.emit(event, payload, callback)
    }

    listen(event: string) {
        return new Observable(observer => {
            this.socket.on(event, (data: any) => {
                observer.next(data);
            });
        });
    }

    loginWs(username: string) {
        return new Promise((resolve, reject) => {
            this.emit('config-user', { username }, (response: any) => {
                this.user.set(username);
                this.saveStorage();
                resolve(response);
                reject(new Error('Login failed'));
            });
        });
    }

    logoutWs() {
        const payload = { username: 'no-name' };
        return new Promise((resolve, reject) => {
            this.emit('config-user', payload, () => {
                this.user.set(null);
                localStorage.removeItem('username');
                this.router.navigate(['/login']);
            });
        });
    }

    getUser() {
        return this.user();
    }

    saveStorage() {
        localStorage.setItem('username', this.user() || '');
    }

    loadStorage() {
        const username = localStorage.getItem('username');
        if (!username) return;
        this.user.set(username);
    }
}
