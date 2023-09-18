import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBasic } from 'src/app/core/models/user-basic.model';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  userBasicForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toasterService: ToastService

  ) { }

  ngOnInit(): void {
    this.userBasicForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
      place: ["", [Validators.required]]
    })
  }

  onReactiveFormSubmit(type: string) {
    // Return if the form is invalid
    if (this.userBasicForm.invalid) {
      this._toasterService.showToast('Please Enter valid credentials', '', 'error');
      return;
    }

    // Disable the form
    // if (!type) {
    //   this.userBasicForm.disable();
    // }
    console.log(this.userBasicForm.value)

    // this._authService.create(this.userBasicForm.value).subscribe(response => {
    //   let res: any = response;
    //   if (!res.error) {
    //     res = res.user;
    //     this._router.navigate(["user"]);
    //   } else {
    //     this._toasterService.showToast(res.message, '', 'error');
    //   };
    // })
    // this._toasterService.showToast('User Create Successfully', '', 'success');
    // this.userBasicForm.reset();
  }
}
