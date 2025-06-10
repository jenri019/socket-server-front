import { ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import type { Message } from '../../interfaces/message.interface';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chat',
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './chat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
    @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
    _chatService = inject(ChatService);
    _wsService = inject(WebsocketService);

    private _formBuilder = inject(FormBuilder);
    form: FormGroup = this._formBuilder.group({
        message: ['']
    });

    messagesSubscription!: Subscription;
    messages = signal<Message[]>([]);

    send() {
        const message = this.form.get('message')?.value.trim();
        if (!message || message === '') return;
        this._chatService.sendMessage(message);
        this.form.reset();
    }

    get currentMessages() {
        const room = this._chatService.chatroom();
        if (room === 'general') {
            return this._chatService.generalMessages();
        }
        return this._chatService.privateMessages()[room] ?? [];
    }

    scrollMessagesToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        }
    }
}
