import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import User from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }
}
