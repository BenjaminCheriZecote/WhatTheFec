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
        path:'policy',
        loadComponent:( ) => import('../components/roots/policy/policy.component').then(module => module.PolicyComponent)
    }
    

];
