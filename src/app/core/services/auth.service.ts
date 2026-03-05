import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BackEndResponse, LoginRequest, LoginResponse ,User} from '@features/auth/models/login-request.model';
import { environment } from '@core/config/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}


  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal(false);

  public CurrentUser = this.currentUser.asReadonly();
  public IsAuthenticated = this.isAuthenticated.asReadonly();

  login(params: LoginRequest): Observable<BackEndResponse<LoginResponse>> {
    return this.httpClient
      .post<BackEndResponse<LoginResponse>>(environment.apiUrl + '/auth/login', params, {
        mode: 'cors',
      })
      .pipe(
        tap((response: BackEndResponse<LoginResponse>) => {
          if (response?.data?.accessToken) {
            this.tokenService.setToken(response.data.accessToken);
            this.currentUser.set(response.data.user);
            this.isAuthenticated.set(true);
          }
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
  
}

