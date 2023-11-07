import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'; 
import { environment } from 'src/app/environments/environment';
import { Posts } from 'src/app/logged-area/home/home.interfaces';


@Injectable({
  providedIn: 'root',
})
export class PostService {

  private API_URL = environment.API_URL;

  private postSubject = new Subject<Posts>();

  private postCreatedSource = new Subject<Posts>();

  postCreated$ = this.postCreatedSource.asObservable();

  constructor(private http: HttpClient) {}

  createPost(newPost: Posts) {
    this.postCreatedSource.next(newPost);
  }

  getPosts(): Observable<Posts> {
    return this.postSubject.asObservable();
  }

  getPostsByUserId(userId: number): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.API_URL}/posts?userId=${userId}`);
  }
}
