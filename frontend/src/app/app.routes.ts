import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { CreateRequestComponent } from './pages/create-request/create-request.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'requests', component: RequestListComponent },
  { path: 'requests/new', component: CreateRequestComponent },
  { path: 'requests/:id', component: RequestDetailsComponent },
  { path: 'categories/new', component: CreateCategoryComponent },
  { path: '**', redirectTo: 'login' }
];
