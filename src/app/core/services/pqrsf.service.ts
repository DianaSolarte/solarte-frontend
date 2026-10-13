import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

export type PqrsfTipo = 'peticion' | 'queja' | 'reclamo' | 'sugerencia' | 'felicitacion';

export interface PqrsfPayload {
  tipo: PqrsfTipo;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  referencia: string;
  descripcion: string;
  acepta_tratamiento_datos: boolean;
}

@Injectable({ providedIn: 'root' })
export class PqrsfService {
  constructor(private readonly http: HttpClient) {}

  create(payload: PqrsfPayload): Observable<unknown> {
    return this.http.post(`${API_BASE_URL}/pqrsf/`, payload);
  }
}
