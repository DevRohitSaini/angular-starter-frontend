import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from 'src/app/shared/toast.service';
import { UserBasicService } from '../../services/user-basic.service';
AuthService
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: { admin: any, role: string };
  @Output() toggler: EventEmitter<any> = new EventEmitter();
  snapshot: RouterStateSnapshot = this._router.routerState.snapshot;
  language: string = 'en';
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userBasicService: UserBasicService,
    private _toasterService: ToastService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this._userBasicService.getUserData();
  }
  toggle() {
    this.toggler.emit();
  }
  signOut() {
    this._authService.signOut().subscribe(response=>{
      let redirectURL = this.snapshot.url;
      this._toasterService.showToast('Logout Successfully', '', 'success');
      //this._router.navigate([''], { queryParams: { redirectURL } });
      this._router.navigate(['login']);
    });
    return true;
  }

  
}
