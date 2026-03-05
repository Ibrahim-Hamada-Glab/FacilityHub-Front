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
  user: User;
}

export interface BackEndResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
    AvatarUrl: string;
    Roles: string[];
    Permissions: string[];
  };


export interface BackEndResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  errorCode: string;
  errors: string[];
  httpStatusCode: number;
}
