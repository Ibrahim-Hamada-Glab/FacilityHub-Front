import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenSerivce {
  private tokenKey = 'access_token';
  constructor(localStorage: Storage) {}


  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
