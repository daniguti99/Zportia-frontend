export interface User {
  id: number;
  username: string;
  email: string;     
  firstName: string;
  lastName: string;
  sports: string[];
  level: string;
  isPrivate: boolean;
  photo: string | null;
  points: number;

  followedByMe: boolean;

  followersCount: number;
  followingCount: number;
  postsCount: number;
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

export interface SimpleUser {
  id: number;
  username: string;
  photo: string | null;
}
