import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BackEndResponse, LoginRequest, LoginResponse, User } from '@features/auth/models/login-request.model';
import { environment } from '@core/config/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;
  private isAuthenticated = false;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  /**
   * Checks authentication status. Call this from guards - it waits for the async /auth/me request.
   * Returns cached result if already fetched, otherwise validates token via API.
   */
  checkAuth(): Observable<boolean> {
    if (!this.tokenService.getToken()) {
      return of(false);
    }
    if (this.currentUser) {
      return of(true);
    }
    return this.httpClient.get<BackEndResponse<User>>(environment.apiUrl + '/auth/me').pipe(
      tap((response: BackEndResponse<User>) => {
        this.currentUser = response.data;
        this.isAuthenticated = true;
      }),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

   public get CurrentUser() : User | null  {
    return  this.currentUser  ;
  }
   
  public get IsAuthenticated() : boolean  {
    return this.isAuthenticated;
  }

  login(params: LoginRequest): Observable<BackEndResponse<LoginResponse>> {
    return this.httpClient
      .post<BackEndResponse<LoginResponse>>(environment.apiUrl + '/auth/login', params, {
        mode: 'cors',
      })
      .pipe(
        tap((response: BackEndResponse<LoginResponse>) => {
          if (response?.data?.accessToken) {
            this.tokenService.setToken(response.data.accessToken);
            this.currentUser = response.data.user;
            this.isAuthenticated = true;
          }
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUser = null;
    this.isAuthenticated = false;
  }
  
}

