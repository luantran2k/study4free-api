import { JwtPayload } from '../accessToken.strategy';

export type AuthRequestType = Express.Request & {
  user: JwtPayload;
};
