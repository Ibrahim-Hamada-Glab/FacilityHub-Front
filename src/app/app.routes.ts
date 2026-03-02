import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./Features/home/home').then(m => m.Home)
    },
     {
        path: 'home',
        loadComponent: () => import('./Features/home/home').then(m => m.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./Features/Auth/login/login').then(m => m.Login)
    }
];
