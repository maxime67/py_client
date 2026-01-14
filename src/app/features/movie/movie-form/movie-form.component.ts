import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GenreApiService } from '../../../core/services/genre-api.service';
import { ParticipantApiService } from '../../../core/services/participant-api.service';
import { MovieApiService } from '../../../core/services/movie-api.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MovieCreate } from '../../../core/models/api.models';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, SpinnerComponent],
})
export class MovieFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly genreApiService = inject(GenreApiService);
  private readonly participantApiService = inject(ParticipantApiService);
  private readonly movieApiService = inject(MovieApiService);

  // TODO 7: Utiliser `toSignal` pour récupérer la liste des genres.
  // Gérer l'erreur avec `catchError` et pipe pour retourner un tableau vide en cas de problème.
  // readonly genres = toSignal(/* ...votre code ici... */, { initialValue: [] });

  // TODO 8: Faire de même pour la liste des participants.
  // readonly participants = toSignal(/* ...votre code ici... */,{ initialValue: [] });

  readonly isSaving = signal(false);


  readonly movieForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(1888)]],
    // Le champ `duration` n'est pas requis, donc on ne le met pas dans le groupe nonNullable.
    // On le définit séparément ou on le laisse tel quel s'il peut être null.
    // Pour simplifier, nous le laissons ici, mais nous le gérons dans le payload.
    duration: [null as number | null, [Validators.min(1)]],
    synopsis: ['', [Validators.required, Validators.minLength(10)]],
    // On doit initialiser les selects requis avec une valeur non-nulle pour que nonNullable fonctionne
    genre_id: [0, [Validators.required, Validators.min(1)]], // min(1) pour s'assurer qu'une vraie option est choisie
    director_id: [0, [Validators.required, Validators.min(1)]],
    actors_ids: [[] as number[], [Validators.required, Validators.minLength(1)]],
  });

  saveMovie(): void {
    // La validation du formulaire vérifie maintenant que les IDs sont > 0
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    // TODO 9: Mettre le signal `isSaving` à `true` au début de la soumission.

    const formValue = this.movieForm.getRawValue();

    // On s'assure que tout est bien typé avant l'envoi
    const moviePayload: MovieCreate = {
      title: formValue.title,
      year: formValue.year,
      duration: formValue.duration,
      synopsis: formValue.synopsis,
      genre_id: Number(formValue.genre_id),
      director_id: Number(formValue.director_id),
      actors_ids: (formValue.actors_ids || []).map(id => Number(id)),
    };

    this.movieApiService.createMovie(moviePayload).subscribe({
      next: createdMovie => {
        // TODO 10: En cas de succès :
        // 1. Mettre `isSaving` à `false`.
        // 2. Naviguer (this.router.navigate) vers la page de détail du film qui vient d'être créé.
      },
      error: err => {
        // TODO 11: En cas d'erreur :
        // 1. Mettre `isSaving` à `false`.
        // 2. Afficher l'erreur dans la console.
      }
    });

  }
}

