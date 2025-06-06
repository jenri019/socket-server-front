import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-chat',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './chat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
    private _formBuilder = inject(FormBuilder);
    _chatService = inject(ChatService);
    form: FormGroup = this._formBuilder.group({
        message: ['']
    });

    send() {
        const message = this.form.get('message')?.value;
        if (!message || message.trim() === '') return;
        console.log('Sending message:', message);
        this._chatService.sendMessage(message);
        this.form.reset();
    }
}
