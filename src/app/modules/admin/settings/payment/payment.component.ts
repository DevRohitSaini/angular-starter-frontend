import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ToastService } from "src/app/shared/toast.service";

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit, AfterViewInit {

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: ToastService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

}

