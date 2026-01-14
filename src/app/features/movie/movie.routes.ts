import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

export const MOVIE_ROUTES: Routes = [
  {
    path: '',
    component: MovieListComponent,
    title: 'Liste des films',
  },
  // ATTENTION : ordre important, new doit être placé AVANT :id
  {
    path: 'new',
    component: MovieFormComponent,
    title: 'Ajouter un film',
  },
  {
    path: ':id',
    component: MovieDetailComponent,
    title: 'Détail du film',
  },
];
