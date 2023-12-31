import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from './home.service';
import { finalize, take } from 'rxjs/operators';
import { Posts, Comment } from './home.interfaces';
import User from 'src/app/shared/interfaces/user.interface';
import { PostService } from 'src/app/shared/services/post-service/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('commentsModal', { static: false }) commentsModal!: ElementRef;

  posts: Posts[] = [];
  users: { [key: number]: User } = {};

  photo: string = "../../../assets/images/avatar.jpg";
  ellipsis: string = "../../../assets/images/ellipsis.png";
  liked: string = "../../../assets/images/icons8-like-30.png";
  noLiked: string = "../../../assets/images/icons8-like-24.png";
  comment: string = "../../../assets/images/comentar.png";
  share: string = "../../../assets/images/share.png";
  userPhoto: string = "../../../assets/images/User.jpg";
  
  isCommentsModalOpen = false;
  noComments = false;
  comments: Comment[] = [];
  newComment: string = '';
  isNewComments: boolean[] = [];
  newImageComment: string = '';

  currentPage = 1;
  itemsPerPage = 10;

  searchText: string = '';

  savedPosts: Posts[] = [];
  savedPostsIds: number[] = [];
  showOptions: boolean[] = [];

  isLoading: boolean = false;
  loadingError: boolean = false;

  constructor(
    private homeService: HomeService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.loadingPosts();
    const savedPostsJSON = localStorage.getItem('savedPosts');
    const savedPostsIdsJSON = localStorage.getItem('savedPostIds');
  
    if (savedPostsJSON && savedPostsIdsJSON) {
      this.savedPosts = JSON.parse(savedPostsJSON);
      this.savedPostsIds = JSON.parse(savedPostsIdsJSON);
    }
    this.comments.forEach(comment => {
      const liked = localStorage.getItem(`comment_like_${comment.id}`);
      if (liked === '1') {
        comment.liked = true;
      }
    });

    this.postService.postCreated$.subscribe((newPost: Posts) => {
      this.posts.unshift(newPost);
    });
  }

  loadingPosts() {
    this.isLoading = true;
    this.loadingError = false;

    this.homeService
      .getPosts(this.currentPage, this.itemsPerPage)
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
    const newPosts = response.map(post => ({ ...post, likes: 0, showOptions: false }));

    for (const post of newPosts) {
      if (!this.users[post.userId]) {
        this.homeService.getUserDetails(post.userId)
          .subscribe(
            user => this.users[post.userId] = user,
            error => console.error(error)
          );
      }
    }

    this.posts = [...this.posts, ...newPosts];
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

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    if (windowHeight + scrollY >= documentHeight) {
      this.loadMorePosts();
    }
  }

  loadMorePosts(): void {
    if (!this.isLoading && !this.loadingError) {
      const scrollY = window.scrollY || window.pageYOffset;

      this.isLoading = true;
      this.currentPage++;

      this.homeService.getPosts(this.currentPage, this.itemsPerPage)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            setTimeout(() => {
              window.scrollTo(0, scrollY);
            }, 0);
          })
        )
        .subscribe(
          response => this.onSuccess(response),
          error => this.onError(error)
        );
    }
  }

  openCommentsModal(postId: number) {
    this.loadComments(postId);
    this.isCommentsModalOpen = true;
  }

  closeCommentsModal() {
    this.isCommentsModalOpen = false;
  }
  
  stopPropagation(event: Event) {
    event.stopPropagation(); 
  }

  loadComments(postId: number) {
    this.homeService.getCommentsByPost(postId)
      .subscribe(
        response => {
          if (response.length === 0) {
            this.noComments = true; 
          } else {
            this.comments = response.map(comment => ({
              ...comment,
              name: 'Usuário',
              likes: 0, 
              liked: false, 
            }));
            this.noComments = false; 
          }
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

  scrollToEndOfModal() {
    const modalElement = this.commentsModal.nativeElement;
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
  
  filterPosts(searchText: string) {
    if (searchText) {
      this.posts = this.posts.filter(post => {
        const ownerName = this.users[post.userId].name;
        return ownerName.toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      this.loadingPosts();
    }
  }

  openOptions(post: Posts) {
    post.showOptions = !post.showOptions;
    post.showSaveOption = !post.createdTimestamp || this.isPostNotRecentlyCreated(post);
  }
  
  isPostNotRecentlyCreated(post: Posts): boolean {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - post.createdTimestamp!;
    const recentlyCreatedThreshold = 60000; 
  
    return timeDifference >= recentlyCreatedThreshold;
  }

  savePost(post: Posts) {
    if (!this.savedPostsIds.includes(post.id)) {
      this.savedPostsIds.push(post.id);
      localStorage.setItem('savedPostIds', JSON.stringify(this.savedPostsIds));
  
      if (post.liked) {
        post.liked = true;
      }
      this.savedPosts.push(post);
      localStorage.setItem('savedPosts', JSON.stringify(this.savedPosts));
    }
  }  

  isPostSaved(post: Posts): boolean {
    return this.savedPostsIds.includes(post.id);
  }
  
  

}