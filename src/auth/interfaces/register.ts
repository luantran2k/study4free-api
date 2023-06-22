export interface RegisterRespone {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  id: string;
  username: string;
  email: string;
  phone: string;
  refreshToken: string;
  avatar: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}
