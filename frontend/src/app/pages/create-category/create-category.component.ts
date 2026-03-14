import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  successMessage = '';
  errorMessage = '';

  handleSubmit(payload: { name: string; description?: string }): void {
    this.categoryService.createCategory(payload).subscribe({
      next: () => {
        this.successMessage = 'Category created successfully.';
        this.errorMessage = '';
        this.router.navigate(['/requests/new']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to create category.';
        this.successMessage = '';
      }
    });
  }
}
