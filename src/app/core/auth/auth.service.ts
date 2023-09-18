import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthUtils } from './auth.utils';
import { environment } from '../../../environments/environment';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { UserBasicService } from '../services/user-basic.service';
import { UserBasic } from '../models/user-basic.model';
@Injectable()
export class AuthService {

    private baseURL = `${environment.apiUrl}`;
    private _authenticated: boolean = false;

    /**
     * Constructor
    */
    constructor(
        private _httpClient: HttpClient,
        private _userBasicService: UserBasicService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
    */
    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     *
     * @param credentials
     */   

    signIn(credentials: { username: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${this.baseURL}/auth/admin-login`, credentials).pipe(
            switchMap((response: any) => {

                if (response.isSuccess) {
                    // Store the access token in the local storage
                    this.accessToken = response.accessToken;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userBasicService.setUserData(response.admin);
                }

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Signup user
     */
    create(data: UserBasic) {
        return this._httpClient.post<UserBasic[]>(`${this.baseURL}/`, data)
            .pipe(
                switchMap((response: any) => {
                    if (!response.error) {
                        // Store the access token in the local storage
                        this.accessToken = response.user.accessToken;

                        // Set the authenticated flag to true
                        this._authenticated = true;

                        // Store the user on the user service
                        this._userBasicService.setUserData(response.admin);
                    }

                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken')

        // for clear users data
        this._userBasicService.clearUserData()
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }    

    /**
     * Check the authentication status
     */
    check() {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }
        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }
        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }
        return of(true);
    }

    /**
     * Get role
     */
    getRole() {
        const type = this._userBasicService.getUserData();
        return type.role;
    }

}
