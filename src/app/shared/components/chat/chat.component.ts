import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chat',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './chat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
    private _formBuilder = inject(FormBuilder);
    _chatService = inject(ChatService);
    form: FormGroup = this._formBuilder.group({
        message: ['']
    });
    messagesSubscription!: Subscription;

    ngOnInit() {
        this.messagesSubscription = this._chatService.getMessages().subscribe({
            next: (message: any) => {
                console.log('New message received:', message);
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
        const message = this.form.get('message')?.value;
        if (!message || message.trim() === '') return;
        this._chatService.sendMessage(message);
        this.form.reset();
    }
}
