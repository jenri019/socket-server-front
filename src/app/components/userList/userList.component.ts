import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { WebsocketService } from '../../services/websocket.service';

@Component({
    selector: 'app-user-list',
    imports: [
        AsyncPipe,
        JsonPipe
    ],
    templateUrl: './userList.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
    _chatService = inject(ChatService);

    activeUsers$: Observable<any>;

    constructor() {
        this.activeUsers$ = this._chatService.getActiveUsers();
    }
    ngOnInit(): void {
        this._chatService.emitActiveUsers();
    }
}
