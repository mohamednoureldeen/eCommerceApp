// src/app/core/services/auth/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // Injecting Router using Angular's inject function
  private readonly router = inject(Router);

  // Holds the decoded user data
  userData: any = null;

  /**
   * Sends the registration form data to the server
   * @param data The user registration data as an object
   * @returns An Observable with the server response
   */
  sendRegesterForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  /**
   * Sends the login form data to the server
   * @param data The user login data as an object
   * @returns An Observable with the server response
   */
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  /**
   * Saves the user data after decoding the JWT token
   */
  saveUserData(): void {
    const token = localStorage.getItem('userToken');
    if (token !== null) {
      this.userData = jwtDecode(token);
      console.log(this.userData);
    }
  }

  /**
   * Logs out the user by removing the token and redirecting to the login page
   */
  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;

    // Navigate to the login page
    this.router.navigate(['/login']);
  }

  /**
   * Sends an email verification request to the server
   * @param data The email data as an object
   * @returns An Observable with the server response
   */
  setEmailVerified(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  /**
   * Sends a code verification request to the server
   * @param data The verification code data as an object
   * @returns An Observable with the server response
   */
  setCodeVerified(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  /**
   * Sends a password reset request to the server
   * @param data The new password data as an object
   * @returns An Observable with the server response
   */
  setResetPass(data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }

}

