export interface Posts {
    userId: number,
    id: number,
    title: string,
    body: string,
    likes: number,
    liked: boolean
}

export interface Photos {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
    likes: number; // Número de likes
    liked: boolean; // Se o usuário atual curtiu o comentário
}
  
  
  
  