import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef)

  submitted = false;

  @Output() formSubmitted = new EventEmitter<{
    name: string;
    description?: string;
  }>();

  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    description: ['', [Validators.maxLength(200)]]
  });

  get name() {
    return this.categoryForm.get('name');
  }

  get description() {
    return this.categoryForm.get('description');
  }

  submit(): void {

    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    this.formSubmitted.emit({
      name: this.categoryForm.value.name!,
      description: this.categoryForm.value.description || ''
    });
    this.cdr.detectChanges();
  }
}