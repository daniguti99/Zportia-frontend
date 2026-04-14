export interface User{
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  sports: string;
  level: string;
  isPrivate: boolean;
  role: string;
  photo: string | null;
  points: number;
}

export interface PostResponse {
  id: number;
  content: string;
  media: string | null;
  location: string | null;
  date: string;
  userId: number;
  username: string;
  userPhoto: string;
  commentsCount: number;
  reactionsCount: number;
  likedByCurrentUser: boolean;
}

export interface CommentResponse {
  id: number;
  text: string;
  date: string;
  userId: number;
  username: string;
  userPhoto: string;
}

export interface LikeUser {
  userId: number;
  username: string;
  userPhoto: string;
}



