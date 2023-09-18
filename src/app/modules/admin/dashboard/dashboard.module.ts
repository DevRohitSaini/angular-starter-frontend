import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoute } from './dashboard.routing';
import { LayoutModule } from 'src/app/core/layout/layout.module';

@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoute),
    LayoutModule,

  ]
})
export class DashboardModule { }
