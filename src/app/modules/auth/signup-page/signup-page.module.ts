import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupPageRouting } from './signup-page.routing';
import { SignupPageComponent } from './signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SignupPageRouting),
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class SignupPageModule { }
