import { Category } from './category.model';

export interface ServiceRequest {
  _id: string;
  title: string;
  description: string;
  categoryId: string | Category;
  createdBy?: string;
  location: string;
  status: 'open' | 'quoted' | 'assigned' | 'completed' | 'cancelled';
  acceptedQuoteId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}