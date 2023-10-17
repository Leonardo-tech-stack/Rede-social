import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Posts, Comment } from '../home/home.interfaces';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./../home/home.component.css']
})
export class UserHomeComponent implements OnInit {
  @ViewChild('commentsModal', { static: false }) commentsModal!: ElementRef;

  userPosts: Posts[] = [];
  user: any;

  isCommentsModalOpen = false;
  comments: Comment[] = [];
  newComment: string = '';

  isLoading = false;
  loadingError = false;
  users: any = {};
  isNewComments: boolean[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.isLoading = true; 

    this.homeService.getUserDetails(1).subscribe(
      (user) => {
        this.user = user;

        this.homeService.getPostsByUserId(1).subscribe(
          (posts) => {
            this.userPosts = posts.map(post => ({
              ...post,
              liked: false,
              likes: 0
            }));
            this.isLoading = false; 
          },
          (error) => {
            console.error(error);
            this.loadingError = true;
            this.isLoading = false; 
          }
        );
      },
      (error) => {
        console.error(error);
        this.loadingError = true;
        this.isLoading = false;
      }
    );
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

  openCommentsModal(postId: number) {
    this.loadComments(postId);
    this.isCommentsModalOpen = true;
  }  

  closeCommentsModal() {
    this.isCommentsModalOpen = false;
  }

  addNewComment() {
    if (this.newComment.trim() !== '') {
      const newComment: Comment = {
        postId: 0,
        id: this.comments.length + 1,
        name: 'Leanne Graham',
        email: 'sincere@april.biz',
        body: this.newComment,
        likes: 0,
        liked: false,
        image: '../../../assets/images/User.jpg',
      };
  
      this.comments.push(newComment);
  
      this.newComment = '';
  
      // Use setTimeout para rolar para o final após um pequeno atraso
      setTimeout(() => {
        this.scrollToEndOfModal();
      });
    }
  }
  

  scrollToEndOfModal() {
    const modalElement = this.commentsModal.nativeElement;
  
    // Role para o final do modal
    modalElement.scrollTop = modalElement.scrollHeight;
  }

  toggleCommentLike(comment: Comment) {
    comment.liked = !comment.liked;
  
    if (comment.liked) {
      comment.likes++; 
      localStorage.setItem(`comment_like_${comment.id}`, '1');
    } else {
      comment.likes--; 
      localStorage.removeItem(`comment_like_${comment.id}`); 
    }
  }  

  loadComments(postId: number) {
    this.homeService.getCommentsByPost(postId)
      .subscribe(
        response => {
          this.comments = response.map(comment => ({
            ...comment,
            name: 'Usuário', 
            likes: 0, 
            liked: false, 
          }));
        },
        error => console.error(error)
      );
  }  
  
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
