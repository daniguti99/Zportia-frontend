export interface User {
  id: number;
  username: string;

  firstName: string;
  lastName: string;

  photo: string | null;
  sports: string[];

  level: string;
  points: number;
  isPrivate: boolean;

  followedByMe: boolean;
  requestedByMe: boolean;
  followsMe: boolean;
  requestedMe: boolean;
  blockedByMe: boolean;
  blockedMe: boolean;

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


export interface FollowResponse {
  message: string;
  originUser: SimpleUser;
  targetUser: SimpleUser;
}
