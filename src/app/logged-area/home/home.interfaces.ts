export interface Posts {
    userId: number,
    id: number,
    title: string,
    body: string,
    likes: number,
    liked: boolean
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
  
  
  
  