import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PqrsfPayload, PqrsfService } from '../../core/services/pqrsf.service';

@Component({
  selector: 'app-pqrsf',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './pqrsf.component.html',
  styleUrls: ['./pqrsf.component.scss'],
})
export class PqrsfComponent {
  readonly tipos = [
    { value: 'peticion', label: 'Petición' },
    { value: 'queja', label: 'Queja' },
    { value: 'reclamo', label: 'Reclamo' },
    { value: 'sugerencia', label: 'Sugerencia' },
    { value: 'felicitacion', label: 'Felicitación' },
  ];

  readonly form = this.formBuilder.group({
    tipo: ['', Validators.required],
    nombre: ['', Validators.required],
    empresa: [''],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    referencia: [''],
    descripcion: ['', Validators.required],
    acepta_tratamiento_datos: [false, Validators.requiredTrue],
  });

  isSubmitting = false;
  submitted = false;
  submitError = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pqrsfService: PqrsfService,
  ) {}

  submit(): void {
    this.submitError = '';
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.submitError = 'Completa los campos obligatorios y acepta el tratamiento de datos antes de enviar.';
      return;
    }

    this.isSubmitting = true;
    this.pqrsfService.create(this.form.getRawValue() as PqrsfPayload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitted = true;
        this.form.reset({ acepta_tratamiento_datos: false });
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'No pudimos enviar tu solicitud. Intenta nuevamente.';
      },
    });
  }
}
