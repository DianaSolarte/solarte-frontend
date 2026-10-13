import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

export interface ApiProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
}

export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  image: string;
  gallery: string[];
  featured: boolean;
  active: boolean;
  is_digital_service: boolean;
  category: ApiProductCategory;
}

export interface ProductFilters {
  category?: string;
  featured?: boolean;
  isDigitalService?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<ApiProductCategory[]> {
    return this.http.get<ApiProductCategory[]>(`${API_BASE_URL}/products/categories/`);
  }

  getProducts(filters: ProductFilters = {}): Observable<ApiProduct[]> {
    let params = new HttpParams();
    if (filters.category) {
      params = params.set('category', filters.category);
    }
    if (filters.featured !== undefined) {
      params = params.set('featured', String(filters.featured));
    }
    if (filters.isDigitalService !== undefined) {
      params = params.set('is_digital_service', String(filters.isDigitalService));
    }
    return this.http.get<ApiProduct[]>(`${API_BASE_URL}/products/products/`, { params });
  }
}
