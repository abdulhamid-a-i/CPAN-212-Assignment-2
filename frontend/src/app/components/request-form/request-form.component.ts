import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css'
})
export class RequestFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  @Input() submitLabel = 'Create Request';
  @Output() formSubmitted = new EventEmitter<{
    title: string;
    description: string;
    categoryId: string;
    location: string;
  }>();

  categories: Category[] = [];
  loadingCategories = false;
  categoryError = '';

  requestForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    categoryId: ['', Validators.required],
    location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]]
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loadingCategories = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loadingCategories = false;
      },
      error: () => {
        this.categoryError = 'Unable to load categories.';
        this.loadingCategories = false;
      }
    });
  }

  submit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.formSubmitted.emit({
      title: this.requestForm.value.title!,
      description: this.requestForm.value.description!,
      categoryId: this.requestForm.value.categoryId!,
      location: this.requestForm.value.location!
    });
  }
}
