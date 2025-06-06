import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { ChatService } from './shared/services/chat.service';
import { ChatComponent } from "./shared/components/chat/chat.component";

@Component({
    selector: 'app-root',
    imports: [
        //RouterOutlet,
        FooterComponent,
        ChatComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {}
