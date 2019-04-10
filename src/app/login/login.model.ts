export interface ILoginDetail {
  userName: string;
  accessToken: string;
  expires: Date;
  loggedinDate?: Date;
  isLoggedIn?: boolean;
}

export interface ILoginUser {
  password: string;
  userName: string;
}
