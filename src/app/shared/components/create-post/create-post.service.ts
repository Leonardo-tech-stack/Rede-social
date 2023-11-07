import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  API_URL = environment.API_URL;
  
  constructor(private http: HttpClient) {}

  createPost(newPost: any): Observable<any> {
    return this.http.post(`${this.API_URL}/posts`, newPost);
  }
}
