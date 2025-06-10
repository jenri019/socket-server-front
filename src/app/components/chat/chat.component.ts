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
export class ChatComponent implements OnInit, OnDestroy {
    @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
    _chatService = inject(ChatService);
    _wsService = inject(WebsocketService);

    private _formBuilder = inject(FormBuilder);
    form: FormGroup = this._formBuilder.group({
        message: ['']
    });

    messagesSubscription!: Subscription;
    messages = signal<Message[]>([]);

    ngOnInit() {
        this.messagesSubscription = this._chatService.getMessages().subscribe({
            next: (message: Message) => {
                //console.log('New message received:', message);
                this.messages.update(msgs => [...msgs, message]);
                setTimeout(() => this.scrollMessagesToBottom(), 20);
            },
            error: (err: any) => {
                console.error('Error receiving message:', err);
            }
        });
    }

    ngOnDestroy() {
        this.messagesSubscription.unsubscribe();
    }

    send() {
        const message = this.form.get('message')?.value.trim();
        if (!message || message === '') return;
        this._chatService.sendMessage(message);
        this.form.reset();
    }

    scrollMessagesToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        }
    }
}
