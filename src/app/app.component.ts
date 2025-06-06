import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { ChatService } from './shared/services/chat.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    _chatService = inject(ChatService);

    ngOnInit() {
        // Example usage of the chat service
        this._chatService.sendMessage('Saludos desde Angular!');
    }
}
