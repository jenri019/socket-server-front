import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './loginPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {

    _websocketService = inject(WebsocketService);
    router = inject(Router);

    private _formBuilder = inject(FormBuilder);
    form: FormGroup = this._formBuilder.group({
        username: ['']
    });

    login() {
        const username = this.form.get('username')?.value.trim();
        if (!username || username === '') return;
        this._websocketService.loginWs(username)
            .then(() => {
                this.form.reset();
                this.router.navigate(['/messages']);
            })
            .catch(error => {
                //console.error('Login error:', error);
            });
    }
}
