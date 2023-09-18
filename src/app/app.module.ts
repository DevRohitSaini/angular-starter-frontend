import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AuthService } from './core/auth/auth.service';
import { Interceptor } from './core/auth/interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';


const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};
export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
      AuthService,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY'
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'DD.MM.YYYY',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    }
  ],
  bootstrap: [AppComponent],
  
  imports: [
    AlertModule.forRoot(),    
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,   
    RouterModule,    
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
    
  ]
})
export class AppModule { }
