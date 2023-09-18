import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRouting } from './pages.routing';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { Page1 } from './landing-page/page1';
import { TableComponent } from '../../shared/components/table/table.component';


@NgModule({
  declarations: [
    PagesComponent,
    Page1,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(PagesRouting),

  ]
})
export class PagesModule { }
