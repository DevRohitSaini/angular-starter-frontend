import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from 'rxjs/operators';
import { Subject, takeUntil } from "rxjs";
import { UserBasicData } from "src/app/core/models/user-basic.model";
import { UserBasicService } from "src/app/core/services/user-basic.service";
import { ToastService } from "src/app/shared/toast.service";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { UtilsService } from "src/app/shared/utils.service";

@Component({
  selector: 'user-list',
  templateUrl: './user-basic-details.html',
  encapsulation: ViewEncapsulation.None,

})
export class UserBasicDetailsComponent implements OnInit, AfterViewInit {
  options :any= {
    componentRestrictions: {
      country: ['IN'], // Specify the desired country code
    },
    fields: ["address_components","geometry"],
    bounds: undefined, // You can specify bounds if needed
    strictBounds: false, // Whether to strictly enforce bounds
    origin: null, // You can specify the origin if needed
  };

  userBasicForm: FormGroup;
  user: any;
  userBasic: any = {
    _id: "",
    userID: "",
    profileImageURL: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    street: "",
    city: "",
    postcode: "",
    country: ""
  }
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private previousUrl: string;

  constructor(
    private _userBasicService: UserBasicService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _arouter: ActivatedRoute,
    private _toasterService: ToastService,
    private _utilsService: UtilsService,
  ) {
    // get previous url
    this._router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    this.userBasicForm = this._formBuilder.group({
      userID: ["", [Validators.required]],
      name: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      gender: ["", [Validators.required]],
      dob: [""],
      street: ["", [Validators.required]],
      city: ["", [Validators.required]],
      postcode: ["", [Validators.required]]
    })
    this.userBasicForm.controls['userID'].disable();

    /**
     *
     * @fetch a user
     */
    if (this._arouter.snapshot.paramMap.get("id")) {
      this.user = this._arouter.snapshot.paramMap.get("id") || '';
      this._userBasicService.fetch(this.user)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((userBasic: UserBasicData) => {
          this.userBasic = userBasic.user || this.userBasic;
          this.userBasicForm.patchValue(this.userBasic);
          this._changeDetectorRef.markForCheck();
        });
    }
  }

  ngAfterViewInit() { }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions and clear object
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * @handleAddressChange function is used for autocomplete address from Google API
   */

  handleAddressChange(address: Address) {
    const [street, city, postcode] = this._utilsService.autocompleteAddressByGoogle(address);

    this.userBasicForm.patchValue({
      street: street,      
      city: city,
      postcode: postcode,
    });
    console.log('street',street);    
    console.log('city',city);
    console.log('postcode',postcode);

    this._changeDetectorRef.markForCheck();
  }

  /**
   * @onReactiveFormSubmit function is used for save data
   */
  onReactiveFormSubmit(type: string): void {

    // Return if the form is invalid
    if (this.userBasicForm.invalid) {
      return;
    }

    // Disable the form
    if (!type) {
      this.userBasicForm.disable();
    }

    const finalObj = this.userBasicForm.value;
    finalObj.type = 'candidate';
    let fn = this._userBasicService.create(finalObj);
    let message = "New User Create Successfully";

    if (this.userBasic && this.userBasic._id) {
      fn = this._userBasicService.update(this.userBasic._id, finalObj);
      message = `User data updated successfully`
    }

    fn.subscribe(
      (response) => {
        this._toasterService.showToast(message, '', 'success');

        if (!type) {
          this._router.navigate(["users"]);
        }
      }
    );
  }

  /**
   * @deleteFn function is used for delete data
  */
  deleteFn(): void {
    if (confirm("Are you sure to delete ?")) {
      this._userBasicService.delete(this.userBasic._id).subscribe(response => {
        this._toasterService.showToast('Deleted Successfully', '', 'success');
        this._router.navigate(["users"]);
      });
    }
  };

  // Back to table component
  goBack() {
    this.userBasicForm.disable();
    this._router.navigate(["users"]);
  }

}



