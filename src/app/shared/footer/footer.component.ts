import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    _websocketService = inject(WebsocketService);
}
