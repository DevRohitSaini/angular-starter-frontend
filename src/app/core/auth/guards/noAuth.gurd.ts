import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  /**
   * @route used for checking role and prevent unauthorized access
   * @state
   */
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   let url: string = state.url;
  //   return this.checkRole(route, url);
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
      return this._check();
  }

  /**
     * Check the authenticated status
     *
     * @private
  */
  private _check(): Observable<boolean> {
    // Check the authentication status
    return this._authService.check()
      .pipe(
        switchMap((authenticated) => {

          // If the user is authenticated...
          if (authenticated) {
            // Redirect to the root
            this._router.navigate(['']);

            // Prevent the access
            return of(false);
          }

          // Allow the access
          return of(true);
        })
      );
  }

  checkRole(route: ActivatedRouteSnapshot, redirectURL: string) {
    // here i take user's role type
    const userRole = this._authService.getRole();

    if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {// in this line i checked role define in routing module is -1 or not;

      this._router.navigate(['/error']);// & routing to error in page

      return false;
    }
    return true;
  }
}
