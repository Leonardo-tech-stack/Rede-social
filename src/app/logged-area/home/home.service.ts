import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment, Posts } from './home.interfaces';
import User from 'src/app/shared/interfaces/user.interface';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient,) { }

  getPosts(currentPage: number, itemsPerPage: number) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return this.http.get<Posts[]>(`${this.API_URL}/posts?_start=${startIndex}&_end=${endIndex}`);
  }  

  getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${userId}`);
  }

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/comments?postId=${postId}`);
  }  
  
  
}