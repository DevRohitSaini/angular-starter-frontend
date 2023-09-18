import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBasicComponent } from './user-basic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserBasicRoute } from './user-basic.routing';
import { UserBasicListComponent } from './list/user-basic-list';
import { UserBasicDetailsComponent } from './details/user-basic-details';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/core/layout/layout.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    UserBasicComponent,
    UserBasicDetailsComponent,
    UserBasicListComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserBasicRoute),
    LayoutModule,
    SharedModule,
    FormsModule,        
    ReactiveFormsModule, 
    AlertModule.forRoot(), 
    GooglePlaceModule,   
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,    
    MatIconModule,
    MatDividerModule,
    MatButtonModule, 
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule
  ]
  
})
export class UserBasicModule { }
