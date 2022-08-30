import { UserInfo } from 'firebase/auth';
export interface FavMovies {
  id: number;
  title: string;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  vote_average: number;
  uid: string;
}
export interface logIn {
  email: string;
  password: string;
}
export interface user {
  email: string;
  password: string;
  userName: string;
}

export interface UserData {
  userInfo: UserInfo;
  fav_movies: FavMovies[];
}
export interface UserData {
  user: UserData;
  message: string;
  isAuthenticated: boolean;
}
