import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private readonly http: HttpClient) {}

  createContactRequest(payload: ContactPayload): Observable<unknown> {
    return this.http.post(`${API_BASE_URL}/contact/`, payload);
  }
}
