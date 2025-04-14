import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ConsultationPageComponent } from './pages/consultation-page/consultation-page.component';
import { DashboardComponentComponent } from './pages/dashboard-component/dashboard-component.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },   // Home Page
    { path: 'consultation', component: ConsultationPageComponent },   // Consultation Page
    { path: 'dashboard', component: DashboardComponentComponent },   // Dashboard Page
    { path: 'login', component: LoginPageComponent },   // Login Page
    { path: 'register', component: RegisterPageComponent },   // Register Page
    { path: 'portfolio', component: PortfolioPageComponent },   // Portfolio Page
    { path: 'profile', component: ProfileComponent },   // Profile Page
    { path: 'settings', component: SettingsComponent },   // Settings Page
    { path: 'transactions', component: TransactionsComponent },   // Transactions Page
    { path: '**', component: NotFoundPageComponent }   // 404 Page
  ];
  
