import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceRequest } from '../../models/request.model';

@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css'
})
export class RequestCardComponent {
  @Input() request!: ServiceRequest;

  get categoryName(): string {
    if (typeof this.request.categoryId === 'object' && this.request.categoryId?.name) {
      return this.request.categoryId.name;
    }
    return 'Unknown Category';
  }
}
