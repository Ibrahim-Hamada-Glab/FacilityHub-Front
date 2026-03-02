import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackEndResponse, LoginRequest, LoginResponse } from '../Features/Auth/Models/loginRequest';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}


  login(params: LoginRequest): Observable<BackEndResponse<LoginResponse>>  {
    return this.httpClient.post<BackEndResponse<LoginResponse>>(environment.apiUrl + '/auth/login', params , {
     
      mode: 'cors',
    }).pipe(
      
      tap((response: BackEndResponse<LoginResponse>) => {

        console.log('Login response received:', response);
      if (response && response.data && response.data.accessToken) {
        localStorage.setItem('access_token', response.data.accessToken);
        console.log('Access token stored in localStorage');
      }
    }));
  }
}
