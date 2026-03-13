import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { MyQuotesComponent } from './pages/my-quotes/my-quotes.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'requests/:id', component: RequestDetailsComponent },
  { path: 'my-quotes', component: MyQuotesComponent }
];
