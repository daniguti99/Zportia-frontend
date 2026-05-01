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
  role: string;
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
  sport: string;
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


export interface Sport {
  id: string;
  name: string;
}

export interface SportResponse {
  id: number;
  name: string;
}

export interface AllSportsResponse {
  message: string;
  sports: SportResponse[];
}

export interface UserDetailsAdminDTO {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isPrivate: boolean;
  photo: string | null;
  level: string;
  status: string;
}
