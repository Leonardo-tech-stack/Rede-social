import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Posts } from './home.interfaces';
import User from 'src/app/shared/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient,) { }

  getPosts() {
    return this.http.get<Posts[]>(`${this.API_URL}/posts`);
  }

  getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${userId}`);
  }
  
}
