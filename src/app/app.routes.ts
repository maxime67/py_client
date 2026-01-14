import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    // Lazy loading des routes de la fonctionnalité "films"
    loadChildren: () =>
      import('./features/movie/movie.routes').then((m) => m.MOVIE_ROUTES),
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    // Redirection pour les routes inconnues
    path: '**',
    redirectTo: 'movies',
  },
];
