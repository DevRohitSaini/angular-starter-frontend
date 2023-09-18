import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserBasic, UserBasicData, UsersBasicData } from '../models/user-basic.model';

@Injectable({
  providedIn: 'root'
})
export class UserBasicService {
  sidebar: boolean = true;
  private baseURL = `${environment.apiUrl}/users`;
  private adminURL = `${environment.apiUrl}/admins`;

  constructor(private _httpClient: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Gets all user
   */
  fetchAll(params: any): Observable<UsersBasicData> {
    return this._httpClient.get<UsersBasicData>(`${this.baseURL}/`, { params: params });
  }

  /**
   * Create user
   */
  create(data: UserBasic) {
    return this._httpClient.post<UserBasic[]>(`${this.baseURL}/`, data);
  }

  /**
   * Get user
   */
  fetch(id: string): Observable<UserBasicData> {
    return this._httpClient.get<UserBasicData>(`${this.baseURL}/${id}`);
  }

  /**
   * Delete user
   */
  delete(id: string) {
    return this._httpClient.delete<UserBasic[]>(`${this.baseURL}/${id}`);
  }

  /**
   * Update user
   */
  update(id: string, userData: UserBasic) {
    return this._httpClient.put<UserBasic[]>(`${this.baseURL}/${id}`, userData);
  }

  /**
   * Update admin data
   */
  updateAdmin(id: string, adminData: any) {
    return this._httpClient.put<any[]>(`${this.adminURL}/${id}`, adminData);
  }

  /**
   * Store the user
   * @param user
   */

  setUserData(admin: any) {
    localStorage.setItem('currentUser', JSON.stringify(admin));
  }

  /**
   *
   * @returns Object
   */
  getUserData(): { admin: any, role: string } {
    let user: any = localStorage.getItem('currentUser');
    if (user) {
      user = JSON.parse(user);
      return {
        admin: user,
        role: user.role
      };
    } else {
      return { admin: '', role: '' };
    };
  }

  /**
   * Remove current user
   */
  clearUserData() {
    localStorage.removeItem('currentUser');
  }
}
export { UsersBasicData };

