import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ChatComponent } from "../../components/chat/chat.component";
import { UserListComponent } from "../../components/userList/userList.component";
import { WebsocketService } from '../../services/websocket.service';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-messages-page',
    imports: [
        CommonModule,
        ChatComponent,
        UserListComponent
    ],
    templateUrl: './messagesPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MessagesPageComponent {
    _websocketService = inject(WebsocketService);
    _chatService = inject(ChatService);
    chatSubscription: any;
    showUserlist = signal<boolean>(true);

    toggleHeader() {
        this.showUserlist.update(value => !value);
    }
}
