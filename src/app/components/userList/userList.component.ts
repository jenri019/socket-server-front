import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import type { Userlist } from '../../interfaces/user.interfaces';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-list',
    templateUrl: './userList.component.html',
    imports: [
        CommonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
    _chatService = inject(ChatService);
    _wsService = inject(WebsocketService);

    constructor() { }

    ngOnInit(): void {
        this._chatService.emitActiveUsers();
    }

    changeUser(user: Userlist | string) {
        if (typeof user === 'string') this._chatService.chatroom.set(user);
        else this._chatService.chatroom.set(user.name);
    }
}
