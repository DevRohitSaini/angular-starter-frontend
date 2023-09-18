import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ){}

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
      const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
      return this._check(redirectUrl);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------



  /**
   * Check the authenticated status
   *
   * @param redirectURL
   * @private
  */

  private _check(redirectURL: string): Observable<boolean>
  {
      // Check the authentication status
      return this._authService.check()
                 .pipe(
                     switchMap((authenticated) => {

                         // If the user is not authenticated...
                         if ( !authenticated )
                         {
                             // Redirect to the sign-in page
                             this._router.navigate(['login'], {queryParams: {redirectURL}});

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

      this._router.navigate([''],{queryParams: {redirectURL}});// & routing to nsign in page

      return false;
    }

    // Check the authentication status
    return this._authService.check()
      .pipe(
        switchMap((authenticated) => {
        // If the user is not authenticated...
        if ( !authenticated )
        {
          // Redirect to the sign-in page
          this._router.navigate([''], {queryParams: {redirectURL}});

          // Prevent the access
          return of(false);
        }
        // Allow the access
        return of(true);
      })
    );
  }
}
