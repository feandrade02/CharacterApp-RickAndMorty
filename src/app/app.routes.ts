import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
        title: 'Início'
    },
    {
        path: 'favoritos',
        component: FavoritosComponent,
        title: 'Favoritos'
    }
];
