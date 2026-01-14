import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Person } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ParticipantApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiRestUrl}/participants`;

  getParticipants(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }
}
