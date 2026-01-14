import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { ANALYZE_MOVIE_QUERY } from '../graphql/graphql.queries';
import { AnalyzeMovieResponse, MovieAnalysis } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class AiApiService {
  private readonly apollo = inject(Apollo);

  getMovieAnalysis(movieId: number): Observable<MovieAnalysis> {
    return this.apollo
      .query<AnalyzeMovieResponse>({
        query: ANALYZE_MOVIE_QUERY,
        variables: {
          movieId: movieId.toString(),
        },
        // Optionnel mais recommandé : 'network-only' pour toujours avoir des données fraîches
        fetchPolicy: 'network-only'
      })
      .pipe(map((result) => result.data.analyzeMovie));
  }
}
