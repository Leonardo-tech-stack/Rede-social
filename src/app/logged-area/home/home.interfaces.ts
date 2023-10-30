import User from "src/app/shared/interfaces/user.interface";

export class Posts {
  id: number;
  userId: number;
  title: string;
  body: string;
  likes: number;
  liked: boolean;
  showOptions: boolean;
  user: User;

  constructor(data: any) {
    this.id = data.id || 0;
    this.userId = data.userId || 0;
    this.title = data.title || '';
    this.body = data.body || '';
    this.likes = data.likes || 0;
    this.liked = data.liked || false;
    this.showOptions = false;
    this.user = data.user || null;
  }
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  likes: number; 
  liked: boolean;
  image: string;
}
  
  
  
  