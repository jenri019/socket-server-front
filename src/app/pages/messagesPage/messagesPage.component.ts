import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ChatComponent } from "../../components/chat/chat.component";
import { UserListComponent } from "../../components/userList/userList.component";
import { WebsocketService } from '../../services/websocket.service';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-messages-page',
    imports: [
        ChatComponent,
        UserListComponent
    ],
    templateUrl: './messagesPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MessagesPageComponent implements OnInit, OnDestroy {
    _websocketService = inject(WebsocketService);
    _chatService = inject(ChatService);
    chatSubscription: any;

    ngOnInit() {
        this.chatSubscription = this._chatService.getPrivateMessages().subscribe({
            next: (message: any) => {
                // Handle the incoming message
                console.log('New private message received:', message);
                // You can add logic here to update the UI or store the message
            },
            error: (err: any) => {
                console.error('Error receiving message:', err);
            }
        });
    }

    ngOnDestroy() {
        this.chatSubscription.unsubscribe();
    }
}
