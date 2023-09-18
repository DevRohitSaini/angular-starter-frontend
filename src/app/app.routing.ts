import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.gurd';

const appRoutes: Routes = [

  // Redirect empty path to '/dashboards'
  { path: '', pathMatch : 'full', redirectTo: 'dashboard'},
  // Redirect signed in user to the '/dashboards'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
  {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},

  // Auth routes for guests  
  {
    path: '', 
    canActivate: [NoAuthGuard],   
    children: [      
      {
        path: 'login', loadChildren: () => import('./modules/auth/login-page/login-page.module').then(m => m.LoginPageModule)
      },
      {
        path: 'signup', loadChildren: () => import('./modules/auth/signup-page/signup-page.module').then(m => m.SignupPageModule)
      },
    ]
  },

  // Admin routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    data: {
      role: ['admin']
    },
    children: [
      { path: '', loadChildren: () => import('./modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule)}
    ]
  },  
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    data: {
      role: ['user', 'admin']
    },
    children: [
      { path: '', loadChildren: () => import('./modules/admin/user-basic/user-basic.module').then(m => m.UserBasicModule)}
    ]
  },

  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    data: {
      role: ['user','admin']
    },
    children: [
      { path: '', loadChildren: () => import('./modules/admin/settings/setting.module').then(m => m.SettingModule)}
    ]
  },
  
  // public routes

  {
    path: 'page',   
    children: [
      { path: '', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)}
    ]
  },
 

  {path: '404-not-found', pathMatch: 'full',loadChildren: () => import('./modules/auth/errors/errors.module').then(m => m.ErrorModule)},
  {path: '**', redirectTo: '404-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
