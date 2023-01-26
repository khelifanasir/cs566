import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(user: { email: string; password: string }) {
    return this.http.post<{ success: boolean; data: string }>(
      environment.server + '/users/login',
      user
    );
  }

  signup(formData: IUser) {
    console.log(formData, 'form');
    return this.http.post<{ success: boolean }>(
      environment.server + '/users/signup',
      formData
    );
  }
}
