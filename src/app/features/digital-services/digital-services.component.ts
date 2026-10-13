import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiProduct, ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-digital-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './digital-services.component.html',
  styleUrls: ['./digital-services.component.scss'],
})
export class DigitalServicesComponent implements OnInit {
  services: ApiProduct[] = [];
  isLoading = true;
  loadError = false;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts({ isDigitalService: true }).subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
      },
    });
  }
}
