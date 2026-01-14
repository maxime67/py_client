import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MovieApiService } from '../../../core/services/movie-api.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SpinnerComponent, DurationPipe],
})
export class MovieListComponent {
  private readonly movieApiService = inject(MovieApiService);

  // TODO 1: Convertir l'Observable de `movieApiService.getMovies()` en un Signal.
  // N'oubliez pas de fournir une `initialValue` pour que le signal soit synchrone dès le départ.
  movies = toSignal(this.movieApiService.getMovies(), { initialValue: [] });

}
