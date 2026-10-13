import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductsService } from '../../core/services/products.service';

type CatalogCategory = 'Todos' | string;

interface CatalogProduct {
  name: string;
  category: string;
  description: string;
  image: string | null;
  gallery: string[];
  featured?: boolean;
  details: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  categories: CatalogCategory[] = ['Todos'];
  products: CatalogProduct[] = [];
  isLoading = true;
  loadError = false;

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const requestedCategory = this.route.snapshot.queryParamMap.get('categoria');

    // El catálogo muestra exclusivamente productos físicos; los servicios digitales viven en su propia página.
    this.productsService.getProducts({ isDigitalService: false }).subscribe({
      next: (apiProducts) => {
        this.products = apiProducts.map((product) => ({
          name: product.name,
          category: product.category?.name ?? '',
          description: product.short_description,
          image: product.image || null,
          gallery: product.gallery?.length ? product.gallery : product.image ? [product.image] : [],
          featured: product.featured,
          details: product.description,
        }));
        this.categories = [
          'Todos',
          ...Array.from(new Set(this.products.map((product) => product.category))),
        ];
        if (requestedCategory && this.categories.includes(requestedCategory)) {
          this.activeCategory = requestedCategory;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
      },
    });
  }

  query = '';
  activeCategory: CatalogCategory = 'Todos';
  selectedProduct: CatalogProduct | null = null;
  activeImageIndex = 0;

  get featuredProducts(): CatalogProduct[] {
    return this.products.filter((product) => product.featured);
  }
  get filteredProducts(): CatalogProduct[] {
    const normalizedQuery = this.query.trim().toLowerCase();
    return this.products.filter((product) => {
      const matchesCategory =
        this.activeCategory === 'Todos' ||
        product.category === this.activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }
  selectCategory(category: CatalogCategory): void {
    this.activeCategory = category;
  }
  applyFilters(): void {
    this.activeCategory = this.activeCategory;
  }
  openProduct(product: CatalogProduct): void {
    this.selectedProduct = product;
    this.activeImageIndex = 0;
    document.body.style.overflow = 'hidden';
  }
  closeProduct(): void {
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }
}
