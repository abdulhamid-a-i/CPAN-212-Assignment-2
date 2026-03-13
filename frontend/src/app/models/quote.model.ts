export interface Quote {
  _id: string;
  requestId: string;
  providerId: string;
  price: number;
  message: string;
  daysToComplete: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: string;
}