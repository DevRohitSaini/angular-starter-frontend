import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { UserBasicService } from "src/app/core/services/user-basic.service";
import { ToastService } from "src/app/shared/toast.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, AfterViewInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  disabledFrom = true;

  currentUser: { admin: any, role: string };

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _userBasicService: UserBasicService,
  ) { }

  ngOnInit(): void {

    //Personal details form
    this.profileForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    })

    //Change password form
    this.passwordForm = this._formBuilder.group({
      password: ["", [Validators.required]],
      matchPassword: ["", [Validators.required]]
    })
    this.passwordForm.controls['matchPassword'].disable();

    /**
     *
     * @fetch admin
    */
    this.currentUser = this._userBasicService.getUserData();
    this.profileForm.patchValue(this.currentUser.admin);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions and clear object
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
    * match Password
    * @param event
  */
  enableField(event: any): void {
    if (event.target.value ) {
      this.passwordForm.controls['matchPassword'].enable();
    }else{
      this.passwordForm.controls['matchPassword'].disable();
    }
  }
  
  checkPassword(event: any): void {
    if (event.target.value === this.passwordForm.value.password) {
      this.disabledFrom = false;
    }
  }

  /**
   * @onReactiveFormSubmit function is used for save data
   */
  onReactiveFormSubmit(): void {

    // Return if the form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    // Disable the form
    this.profileForm.disable();

    const finalObj = this.profileForm.value;
    let fn = this._userBasicService.updateAdmin(this.currentUser.admin._id, finalObj);
    fn.subscribe(
      (response: any) => {
        // Store the user on the user service
        this._userBasicService.setUserData(response.savedUser);

        this.currentUser = this._userBasicService.getUserData();
        // Re-enable the form
        this.profileForm.enable();

        this._toasterService.showToast('data updated successfully', '', 'success');
      }
    );
  }

  /**
   * @resetPassword function is used for reset admin password
   */
  resetPassword(): void {

    // Return if the form is invalid
    if (this.passwordForm.invalid) {
      return;
    }
    
    let jsonData = {
      "password": this.passwordForm.value.password
    }
    
    // Disable the form
    this.passwordForm.disable();

    let fn = this._userBasicService.updateAdmin(this.currentUser.admin._id, jsonData);
    fn.subscribe(
      (response) => {
        // Reset the form
        this.passwordForm.reset();
        // Re-enable the form
        this.passwordForm.enable();

        this.passwordForm.controls['matchPassword'].disable();

        this._toasterService.showToast('Password has been changed', '', 'success');        
      }
    );
  }

}

