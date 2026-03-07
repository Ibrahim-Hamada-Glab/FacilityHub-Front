export interface LoginRequest {
  email: string;
  password: string;
}



 export interface User{
  Id: string;
  FullName: string;
  Email: string;
  AvatarUrl: string;
  Roles: string[];
  Permissions: string[];
}
export interface LoginResponse {
  accessToken: string;
  expiresAt: Date;
  refreshTokenExpiresAt: Date;
  user: User;
}

 

export interface BackEndResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  errorCode: string;
  errors: string[];
  httpStatusCode: number;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface VerifyEmailRequest {
  userId: string;
  token: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
