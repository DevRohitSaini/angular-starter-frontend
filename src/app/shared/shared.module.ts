import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap/alert';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';

import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    SharedComponent,
    TableComponent,
    ModalComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,    
    AlertModule.forRoot(),
    MatSortModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports:[
    SharedComponent,
    TableComponent,
    ModalComponent,
  ]
})
export class SharedModule { }
