import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * @description Validate user email & password from local strategy (username & password)
   * @param email  user email or phone number (identifier) to validate user credentials against it
   * @param password user password to validate user credentials against it
   * @returns User | null return either valid user or null
   */
  async validate(username: string, password: string) {
    const user = await this.authService.validateUserCredentials({ username, password });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
