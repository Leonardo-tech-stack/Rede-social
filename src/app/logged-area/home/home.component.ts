import { Component, OnInit, HostListener } from '@angular/core';
import { HomeService } from './home.service';
import { finalize, take } from 'rxjs';
import { Posts } from './home.interfaces';
import User from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Posts[] = [];
  users: { [key: number]: User } = {}; 

  isLoading: boolean = false;
  loadingError: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.loadingPosts();
  }
  
  loadingPosts() {
    this.isLoading = true;
    this.loadingError = false;
  
    this.homeService
      .getPosts()
      .pipe(
        take(1),
        finalize(() => {
          this.posts.forEach(post => {
            const likeKey = `like_${post.id}`;
            const liked = localStorage.getItem(likeKey);
  
            if (liked === '1') {
              post.liked = true;
              post.likes++; 
            } else {
              post.liked = false;
            }
          });
  
          this.isLoading = false; 
        })
      )
      .subscribe(
        response => this.onSuccess(response),
        error => this.onError(error),
      );
  }   

  onSuccess(response: Posts[]) {
    this.posts = response;

    for (const post of this.posts) {
      post.likes = 0;
    }

    for (const post of this.posts) {
      if (!this.users[post.userId]) {
        this.homeService.getUserDetails(post.userId)
          .subscribe(
            user => this.users[post.userId] = user,
            error => console.error(error)
          );
      }
    }

    this.shuffleArray(this.posts);
  }

  onError(error: any) {
    this.loadingError = true;
    console.error(error);
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  likePost(post: Posts) {
    post.likes++; 
  }  
  
  toggleLike(post: Posts) {
    post.liked = !post.liked;
  
    const likeKey = `like_${post.id}`;
    if (post.liked) {
      localStorage.setItem(likeKey, '1');
      post.likes++; 
    } else {
      localStorage.removeItem(likeKey); 
      post.likes--; 
    }
  }
  
  
}
