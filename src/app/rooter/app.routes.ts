import { Routes } from '@angular/router';
import { HomeComponent } from '../components/roots/home/home.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'testing',
        loadComponent:( ) => import('../components/roots/testing/testing.component').then(module => module.TestingComponent)
    },
    {
        path:'**',
        loadComponent:( ) => import('../components/roots/404/404.component').then(module => module.PageNotFoundComponent)
    },
    

];
