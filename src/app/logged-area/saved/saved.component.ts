import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { Posts, Comment } from '../home/home.interfaces';
import { HomeService } from '../home/home.service';
import User from 'src/app/shared/interfaces/user.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['../home/home.component.css', './saved.component.css']
})
export class SavedComponent implements OnInit {
  @ViewChild('commentsModal', { static: false }) commentsModal!: ElementRef;
  @ViewChild('commentsModalBody') commentsModalBody: ElementRef | undefined;
  @Input() comments: Comment[] = [];
  
  savedPosts: Posts[] = [];

  photo: string = "../../../assets/images/avatar.jpg";
  ellipsis: string = "../../../assets/images/ellipsis.png";
  liked: string = "../../../assets/images/icons8-like-30.png";
  noLiked: string = "../../../assets/images/icons8-like-24.png";
  comment: string = "../../../assets/images/comentar.png";
  share: string = "../../../assets/images/share.png";
  userPhoto: string = "../../../assets/images/User.jpg";

  newComment: string = '';
  isCommentsModalOpen = false;
  isSaveButtonVisible: boolean = false;
  isOptionsMenuOpen: boolean = false;
  isRemoveModalOpen: boolean = false;
  postToRemove: Posts | null = null;
  isRemoveModalVisible = false;
  postWithOptions: Posts | null = null;
  users: { [key: number]: User } = {};

  homeLink: string = '/home';

  isLoading: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.loadSavedPosts();
  }

  loadSavedPosts() {
    const savedPostIdsJSON = localStorage.getItem('savedPostIds');
    if (savedPostIdsJSON) {
      const savedPostIds = JSON.parse(savedPostIdsJSON) as number[];
      this.isLoading = true;
      const observables = savedPostIds.map(postId => this.homeService.getPostById(postId));

      forkJoin(observables).subscribe(
        (posts: Posts[]) => {
          this.savedPosts = posts;
          this.savedPosts.forEach(post => {
            this.loadUserDetails(post.userId, post);

            const likeKey = `like_${post.id}`;
            const liked = localStorage.getItem(likeKey);
            if (liked === '1') {
              post.liked = true;
            }

            post.likes = post.liked ? 1 : 0;
          });
        },
        error => console.error(error),
        () => {
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
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

  toggleCommentLike(comment: Comment) {
    comment.liked = !comment.liked;
  
    const likeKey = `comment_like_${comment.id}`;
    if (comment.liked) {
      localStorage.setItem(likeKey, '1');
      comment.likes = (comment.likes || 0) + 1; 
    } else {
      localStorage.removeItem(likeKey);
      comment.likes = (comment.likes || 1) - 1; 
    }
  }  

  loadUserDetails(userId: number, post: Posts) {
    this.homeService.getUserDetails(userId).subscribe(
      (user: User) => {
        post.user = user;
      },
      error => console.error(error)
    );
  }

  openCommentsModal(postId: number) {
    this.loadComments(postId);
    this.isCommentsModalOpen = true;
  }

  closeCommentsModal(event: Event) {
    if (this.commentsModal && event.target === this.commentsModal.nativeElement) {
      this.isCommentsModalOpen = false;
    }
  }

  loadComments(postId: number) {
    this.homeService.getCommentsByPost(postId).subscribe(
      (response: Comment[]) => {
        this.comments = response;
      },
      error => console.error(error)
    );
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
  
      setTimeout(() => {
        this.scrollToEndOfModal();
      });
    }
  } 

  isPostSaved(post: Posts): boolean {
    return this.savedPosts.some(savedPost => savedPost.id === post.id);
  }

  saveOrUnsavePost(post: Posts) {
    if (this.isPostSaved(post)) {
      this.savedPosts = this.savedPosts.filter(savedPost => savedPost.id !== post.id);
      localStorage.setItem('savedPosts', JSON.stringify(this.savedPosts));

      const savedPostIdsJSON = localStorage.getItem('savedPostIds');
      if (savedPostIdsJSON) {
        const savedPostIds = JSON.parse(savedPostIdsJSON) as number[];
        const updatedSavedPostIds = savedPostIds.filter((postId: number) => postId !== post.id);
        localStorage.setItem('savedPostIds', JSON.stringify(updatedSavedPostIds));
      }
    } else {
      if (post.liked) {
        post.liked = true;
      }
      this.savedPosts.push(post);
      localStorage.setItem('savedPosts', JSON.stringify(this.savedPosts));

      const savedPostIdsJSON = localStorage.getItem('savedPostIds');
      const savedPostIds = savedPostIdsJSON ? JSON.parse(savedPostIdsJSON) as number[] : [];
      savedPostIds.push(post.id);
      localStorage.setItem('savedPostIds', JSON.stringify(savedPostIds));
    }
  }

  toggleSavePostButton() {
    this.isSaveButtonVisible = !this.isSaveButtonVisible;
  }

  toggleOptionsMenu(post: Posts) {
    this.isOptionsMenuOpen = !this.isOptionsMenuOpen;
  }

  openRemoveModal(post: Posts) {
    this.postToRemove = post;
    this.isRemoveModalVisible = true;
  }

  closeRemoveModal() {
    this.isRemoveModalVisible = false;
  }

  removePost(post: Posts) {
    if (post) {
      const postIdToRemove = post.id;
      this.savedPosts = this.savedPosts.filter((savedPost) => savedPost.id !== postIdToRemove);

      const savedPostIds = this.savedPosts.map((savedPost) => savedPost.id);
      localStorage.setItem('savedPostIds', JSON.stringify(savedPostIds));
      localStorage.setItem('savedPosts', JSON.stringify(this.savedPosts));

      this.closeRemoveModal();
    }
  }

  openOptions(post: Posts) {
    if (this.isOptionsMenuOpen && this.postWithOptions === post) {
      this.isOptionsMenuOpen = false;
      this.postWithOptions = null;
    } else {
      this.isOptionsMenuOpen = true;
      this.postWithOptions = post;
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  scrollToEndOfModal() {
    const modalElement = this.commentsModal.nativeElement;
    modalElement.scrollTop = modalElement.scrollHeight;
  } 
  
}
