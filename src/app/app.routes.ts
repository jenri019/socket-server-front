import { Routes } from '@angular/router';
import { userGuard } from './guards/user.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: 'login',
        canMatch: [loginGuard],
        loadComponent: () => import('./pages/loginPage/loginPage.component'),
    },
    {
        path: 'messages',
        canMatch: [userGuard],
        loadComponent: () => import('./pages/messagesPage/messagesPage.component'),
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
