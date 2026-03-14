import { Category } from './category.model';
import { User } from './user.model';

export interface ServiceRequest {
  _id: string;
  title: string;
  description: string;
  categoryId: string | Category;
  createdBy?: User| string;
  location: string;
  status: 'open' | 'quoted' | 'assigned' | 'completed' | 'cancelled';
  acceptedQuoteId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}