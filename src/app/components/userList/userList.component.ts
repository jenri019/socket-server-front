import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { toSignal } from '@angular/core/rxjs-interop';
import type{ Userlist } from '../../interfaces/user.interfaces';

@Component({
    selector: 'app-user-list',
    templateUrl: './userList.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
    _chatService = inject(ChatService);

    //activeUsers = toSignal<Userlist[]>(this._chatService.getActiveUsers());

    constructor() {}

    ngOnInit(): void {
        this._chatService.emitActiveUsers();
    }
}
