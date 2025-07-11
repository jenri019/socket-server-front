import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

export const loginGuard: CanMatchFn = (route, segments) => {
    const _websocketService = inject(WebsocketService);
    const router = inject(Router);
    if (_websocketService.getUser()) {
        router.navigateByUrl('/messages');
        return false;
    }
    return true;
};
