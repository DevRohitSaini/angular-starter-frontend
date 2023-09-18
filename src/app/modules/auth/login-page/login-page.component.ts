import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _toasterService: ToastService
  ) { }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["", [Validators.required]],
      rememberMe: [""],
    });
  }

  /**
   *@login this  function used for generate token and for authentication
  */
  onReactiveFormSubmit(): void {
    // Return if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Disable the form
    this.loginForm.disable();

    // Sign in
    this._authService.signIn(this.loginForm.value)
      .subscribe(
        () => {

          // Set the redirect url.
          // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);

        },
        (response) => {

          // Re-enable the form
          this.loginForm.enable();

          // Reset the form
          this.loginForm.reset();

          // Set the alert                    
          this._toasterService.showToast('Failed to login', '', 'error');
        }
      );
  }
}
