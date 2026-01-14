import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie, MovieAnalysis } from '../../../core/models/api.models';
import { AiApiService } from '../../../core/services/ai-api.service';
import { MovieApiService } from '../../../core/services/movie-api.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';

// Nouvelle structure pour l'état de nos données
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface MovieDetailState {
  movie: AsyncState<Movie>;
  analysis: AsyncState<MovieAnalysis>;
}

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpinnerComponent, DurationPipe],
})
export class MovieDetailComponent {
  id = input.required<number>(); // ID reçu en entrée (transmis par le routeur)

  private readonly movieApiService = inject(MovieApiService);
  private readonly aiApiService = inject(AiApiService);

  // Le signal d'état est initialisé avec la nouvelle structure
  readonly state = signal<MovieDetailState>({
    movie: { data: null, loading: true, error: null },
    analysis: { data: null, loading: true, error: null },
  });

  // TODO 2: Créer les signaux `computed` pour lire l'état plus facilement.
  readonly movie = computed(() => this.state().movie.data);
  readonly analysis = computed(() => this.state().analysis.data);
  readonly isMovieLoading = computed(() => this.state().movie.loading);
  readonly movieError = computed(() => this.state().movie.error);
  readonly actors = computed(() =>
    this.state().movie.data?.actors.map(a => `${a.first_name} ${a.last_name}`).join(', ')
  );

  // On utilise un tableau pour gérer les souscriptions
  private subscriptions: Subscription[] = [];

  constructor() {
    effect((onCleanup) => {
      // On nettoie toutes les souscriptions précédentes
      onCleanup(() => this.subscriptions.forEach(sub => sub.unsubscribe()));

      const movieId = this.id();
      this.fetchData(movieId);
    });
  }

  private fetchData(movieId: number): void {
    // On réinitialise l'état au début de chaque fetch
    this.state.set({
      movie: { data: null, loading: true, error: null },
      analysis: { data: null, loading: true, error: null },
    });

    // === SOUSCRIPTION N°1 : DÉTAILS DU FILM (RAPIDE) ===
    const movieSub = this.movieApiService.getMovieById(movieId).subscribe({
      next: (movieData) => {
        this.state.update(s => ({
          ...s,
          movie: { data: movieData, loading: false, error: null }
        }));
      },
      error: (err) => {
        this.state.update(s => ({
          ...s,
          movie: { data: null, loading: false, error: err.message }
        }));
      },
    });

    // === SOUSCRIPTION N°2 : ANALYSE IA (PLUS LENT) ===
    const analysisSub = this.aiApiService.getMovieAnalysis(movieId).subscribe({
      next: (analysisData) => {
        this.state.update(s => ({
          ...s,
          analysis: { data: analysisData, loading: false, error: null }
        }));
      },
      error: (err) => {
        this.state.update(s => ({
          ...s,
          analysis: { data: null, loading: false, error: err.message }
        }));
      },
    });

    // On stocke les souscriptions pour les nettoyer plus tard
    this.subscriptions = [movieSub, analysisSub];
  }
}
