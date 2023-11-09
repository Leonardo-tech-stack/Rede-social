import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PostService } from '../../services/post-service/post-service.service';
import { Posts } from 'src/app/logged-area/home/home.interfaces';
import User from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  user: any;

  newPost = {
    title: '',
    body: '',
    userId: 1, 
  };

  postCreated = new EventEmitter<Posts>();

  showEmojiPicker = false;
  
  constructor(
    public bsModalRef: BsModalRef,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  createPost() {
    const currentUserId = 1;
    const currentTime = new Date().getTime();
  
    const newPost: Posts = {
      id: 0,
      userId: currentUserId,
      title: this.newPost.title,
      body: this.newPost.body,
      likes: 0,
      liked: false,
      showOptions: false,
      user: {} as User,
      createdTimestamp: currentTime, // Adicione esta linha
    };
  
    this.postService.createPost(newPost);
  
    this.bsModalRef.hide();
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    this.postCreated.emit(newPost);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  isValidForm(): boolean {
    return this.newPost.title.trim() !== '' && this.newPost.body.trim() !== '';
  }
  
  
}
