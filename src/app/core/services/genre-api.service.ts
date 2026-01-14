import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Genre } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class GenreApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiRestUrl}/genres`;

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }
}
