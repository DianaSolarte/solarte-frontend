import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  active: boolean;
}

export interface QuotationPayload {
  full_name: string;
  organization: string;
  position: string;
  email: string;
  phone: string;
  city: string;
  category: number;
  approximate_quantity: string;
  description: string;
  configuration_details: Record<string, string | boolean | number>;
}

@Injectable({ providedIn: 'root' })
export class QuotationsService {
  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${API_BASE_URL}/products/categories/`);
  }

  createQuotation(payload: QuotationPayload): Observable<unknown> {
    return this.http.post(`${API_BASE_URL}/quotations/`, payload);
  }
}
