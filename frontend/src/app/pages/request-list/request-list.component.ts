import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';
import { ServiceRequest } from '../../models/request.model';
import { RequestCardComponent } from '../../components/request-card/request-card.component';
import { User } from '../../models/user.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RequestCardComponent, FormsModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {
  private requestService = inject(RequestService);
  private authService = inject(AuthService);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  requests: ServiceRequest[] = [];
  loading = false;
  errorMessage = '';
  currentUser: User | null = null;
  categories: Category[] = [];
  searchTimeout: any;

  filters = {
    status: '',
    categoryId: '',
    q: ''
  };

ngOnInit(): void {
  this.loadCurrentUser();
  this.loadCategories();
  this.loadRequests();
}

  loadRequests(): void {
    this.loading = true;

    this.requestService.getRequests(this.filters).subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load requests.';
        this.loading = false;
        
      }
    });
  }
  

  loadCategories(): void {
  this.categoryService.getCategories().subscribe({
    next: (data) => {
      this.categories = data;
    },
    error: () => {
      this.errorMessage = 'Unable to load categories.';
      
    }
  });
}

  loadCurrentUser(): void {
    this.authService.me().subscribe({
      next: (res) => {
        this.currentUser = res.user;
      },
      error: () => {
        this.errorMessage = 'Unable to load current user.';
        
      }
    });
  }

  onSearchChange(value: string): void {

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.filters.q = value;
      this.loadRequests();
    }, 400);
  }
  
  applyFilters(): void {
    this.loadRequests();
  }

  onFilterChange(): void {
    this.loadRequests();
  }

  clearFilters(): void {
    this.filters = {
      status: '',
      categoryId: '',
      q: ''
    };

    this.loadRequests();
  }
}
