import { Routes } from '@angular/router';

export const routes: Routes = [

{
  path: 'about',
  loadComponent:()=> import('./pages/about-page/about-page.component'),
},
{
  path: 'contact',
  loadComponent:() => import('./pages/contact-page/contact-page.component'),
},
{
  path:'pricing',
  loadComponent: () => import('./pages/pricing-page/pricing-page.component'),
},
{
  path:'pokemons',
  loadComponent: () => import('./pokemons/pages/pokemons-page/pokemons-page.component'),
},
{
  path:'pokemon/:id',
  loadComponent: () => import('./pokemons/components/pokemon-page/pokemon-page.component'),
},
{
  path:'**',
  redirectTo: 'about'
}
];
