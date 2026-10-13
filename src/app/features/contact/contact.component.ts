import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ContactService } from '../../core/services/contact.service';

interface QuickOption {
  label: string;
  categoria?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  readonly quickOptions: QuickOption[] = [
    { label: 'Quiero cotizar agendas', categoria: 'agendas-y-papeleria' },
    { label: 'Quiero publicidad impresa', categoria: 'publicidad-e-impresion' },
    { label: 'Quiero un producto personalizado', categoria: 'productos-personalizados' },
    { label: 'Quiero una página web', categoria: 'digital-y-tecnologia' },
    { label: 'Quiero automatizar un proceso', categoria: 'digital-y-tecnologia' },
    { label: 'Tengo otro proyecto' },
  ];

  readonly contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  isSubmitting = false;
  submitted = false;
  submitError = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contactService: ContactService,
  ) {}

  submit(): void {
    this.submitError = '';
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.submitError = 'Completa los campos obligatorios antes de enviar el mensaje.';
      return;
    }

    this.isSubmitting = true;
    this.contactService.createContactRequest(this.contactForm.getRawValue() as {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitted = true;
        this.contactForm.reset();
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'No pudimos enviar el mensaje. Intenta nuevamente.';
      },
    });
  }
}
