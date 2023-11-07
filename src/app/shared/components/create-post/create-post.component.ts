import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HomeService } from 'src/app/logged-area/home/home.service';
import { CreatePostService } from './create-post.service';
import { PostService } from '../../services/post-service/post-service.service';
import { Posts } from 'src/app/logged-area/home/home.interfaces';
import User from '../../interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  newPost = {
    title: '',
    body: '',
    userId: 1, 
  };

  postCreated = new EventEmitter<Posts>();

  constructor(
    public bsModalRef: BsModalRef,
    private homeService: HomeService,
    private createPostService: CreatePostService, 
    private postService: PostService,
    private toastr: ToastrService
  ) {}

  createPost() {
    const currentUserId = 1; 
    const newPost: Posts = {
      id: 0, 
      userId: currentUserId, 
      title: this.newPost.title,
      body: this.newPost.body,
      likes: 0,
      liked: false,
      showOptions: false,
      user: {} as User, 
    };
  
    this.postService.createPost(newPost);

    this.bsModalRef.hide();
  
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.postCreated.emit(newPost);
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
