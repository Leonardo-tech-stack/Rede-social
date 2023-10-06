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
  