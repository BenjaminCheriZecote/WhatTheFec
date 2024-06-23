import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:( ) => import('../components/roots/home/home.component').then(module => module.HomeComponent)
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
