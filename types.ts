export type AuthStatus = 'pending' | "unauthorized" | "authorized"
export type Credential = {
  id: string;
  name: string;
  email: string;
  websiteUrl: string;
  category: string;
  username: string;
  updatedAt: Date;
  password: string;
};


export type EncrytedSharedPrivateKey = {
  salt : string
  iv : string
  data : string
}