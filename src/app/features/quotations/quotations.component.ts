import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  ProductCategory,
  QuotationPayload,
  QuotationsService,
} from '../../core/services/quotations.service';

@Component({
  selector: 'app-quotations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss'],
})
export class QuotationsComponent implements OnInit {
  categories: ProductCategory[] = [];
  isLoading = true;
  loadError = false;
  isSubmitting = false;
  submitted = false;
  submitError = '';

  readonly quotationForm = this.formBuilder.group({
    category: [null as number | null, Validators.required],
    contact: this.formBuilder.group({
      full_name: ['', Validators.required],
      organization: [''],
      position: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      city: [''],
    }),
    configuration: this.formBuilder.group({
      agenda_type: [''],
      cover_type: [''],
      binding_type: [''],
      manual_pages: [null as number | null],
      includes_manual: [false],
      process: [''],
      current_process: [''],
      desired_result: [''],
      project_type: [''],
      page_count: [null as number | null],
      print_type: [''],
      size: [''],
    }),
    project: this.formBuilder.group({
      approximate_quantity: [''],
      description: ['', Validators.required],
    }),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly quotationsService: QuotationsService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const requestedSlug = this.route.snapshot.queryParamMap.get('categoria');
    this.quotationsService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        if (requestedSlug) {
          const match = categories.find((category) => category.slug === requestedSlug);
          if (match) {
            this.quotationForm.controls.category.setValue(match.id);
          }
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
      },
    });
  }

  get selectedCategory(): ProductCategory | undefined {
    return this.categories.find((category) => category.id === this.quotationForm.controls.category.value);
  }

  get isAgendaCategory(): boolean {
    return this.selectedCategory?.slug === 'agendas-y-papeleria';
  }

  get isDigitalCategory(): boolean {
    return this.selectedCategory?.slug === 'digital-y-tecnologia';
  }

  submit(): void {
    this.submitError = '';
    this.quotationForm.markAllAsTouched();
    if (this.quotationForm.invalid || !this.quotationForm.controls.category.value) {
      this.submitError = 'Completa los campos obligatorios antes de enviar la solicitud.';
      return;
    }

    const value = this.quotationForm.getRawValue();
    const category = value.category;
    if (!category) {
      return;
    }
    const payload: QuotationPayload = {
      full_name: value.contact.full_name ?? '',
      organization: value.contact.organization ?? '',
      position: value.contact.position ?? '',
      email: value.contact.email ?? '',
      phone: value.contact.phone ?? '',
      city: value.contact.city ?? '',
      category,
      approximate_quantity: value.project.approximate_quantity ?? '',
      description: value.project.description ?? '',
      configuration_details: this.compactConfiguration(value.configuration),
    };

    this.isSubmitting = true;
    this.quotationsService.createQuotation(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitted = true;
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'No pudimos enviar la solicitud. Intenta nuevamente.';
      },
    });
  }

  private compactConfiguration(configuration: Record<string, unknown>): Record<string, string | boolean | number> {
    return Object.entries(configuration).reduce<Record<string, string | boolean | number>>((result, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        result[key] = value as string | boolean | number;
      }
      return result;
    }, {});
  }
}
