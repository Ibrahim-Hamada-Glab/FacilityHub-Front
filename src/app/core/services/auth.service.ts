import { HttpClient } from '@angular/common/http';
import { signal, computed, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import {
  BackEndResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  User,
  VerifyEmailRequest,
} from '@app/features/auth/models/login-request.model';
import { environment } from '../config/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>(null);

  public readonly currentUser = this.userSignal.asReadonly();

  public readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  checkAuth(): Observable<boolean> {
    const token = this.tokenService.getToken();
    if (!token) return of(false);

    if (this.userSignal()) return of(true);

    return this.httpClient.get<BackEndResponse<User>>(`${environment.apiUrl}/auth/me`).pipe(
      tap(response => this.userSignal.set(response.data)),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  login(params: LoginRequest): Observable<BackEndResponse<LoginResponse>> {
    return this.httpClient
      .post<BackEndResponse<LoginResponse>>(`${environment.apiUrl}/auth/login`, params)
      .pipe(
        tap(response => {
          if (response?.data?.accessToken) {
            this.tokenService.setToken(response.data.accessToken);
            this.userSignal.set(response.data.user);
          }
        })
      );
  }

  register(params: RegisterRequest): Observable<BackEndResponse<LoginResponse>> {
    return this.httpClient.post<BackEndResponse<LoginResponse>>(
      `${environment.apiUrl}/auth/Register`,
      params
    );
  }

  forgotPassword(params: ForgotPasswordRequest): Observable<BackEndResponse<null>> {
    return this.httpClient.post<BackEndResponse<null>>(
      `${environment.apiUrl}/auth/forgot-password`,
      params
    );
  }

  resetPassword(params: ResetPasswordRequest): Observable<BackEndResponse<null>> {
    return this.httpClient.post<BackEndResponse<null>>(
      `${environment.apiUrl}/auth/reset-password`,
      params
    );
  }

  verifyEmail(params: VerifyEmailRequest): Observable<BackEndResponse<null>> {
    return this.httpClient.post<BackEndResponse<null>>(
      `${environment.apiUrl}/auth/verify-email`,
      params
    );
  }

  changePassword(params: ChangePasswordRequest): Observable<BackEndResponse<null>> {
    return this.httpClient.post<BackEndResponse<null>>(
      `${environment.apiUrl}/auth/change-password`,
      params
    );
  }

  refreshToken(): Observable<BackEndResponse<LoginResponse>> {
    const token = this.tokenService.getToken();
    const jsonToken = { Token: token };
    return this.httpClient
      .post<BackEndResponse<LoginResponse>>(`${environment.apiUrl}/auth/refresh-token`, jsonToken)
      .pipe(
        tap(response => {
          if (response?.data?.accessToken) {
            this.tokenService.setToken(response.data.accessToken);
            this.userSignal.set(response.data.user);
          }
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.userSignal.set(null);
  }
}
