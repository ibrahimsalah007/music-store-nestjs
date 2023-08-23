import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcryptjs';

import { LoginResponseDto } from './dto/login-response.dto';
import { UserService } from 'App/user/user.service';
import { User } from 'App/user/user.entity';
import { CreateUserDto } from 'App/user/dto';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async createUser(createUserDto: CreateUserDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOne([{ email: createUserDto.email }, { username: createUserDto.username }]);

    if (user) throw new ConflictException('User already exists');

    const newUser = await this.userService.createUser(createUserDto);

    return {
      data: newUser,
      accessToken: this.jwtService.sign({ id: newUser.id }),
    };
  }

  /**
   * @description Login user & return access token & user data
   * @param user user to login
   * @returns {LoginResponseDto} return access token & user data
   */
  login(user: User): LoginResponseDto {
    const payload = { id: user.id };

    return { data: user, accessToken: this.jwtService.sign(payload) };
  }

  /**
   * @description Validate user credentials
   * @param  {LoginDto} {identifier user email or phone number (identifier) to validate user credentials against it
   * @returns User | null return either valid user or null
   */
  async validateUserCredentials({ username, password }: LoginDto): Promise<User | null> {
    const user = await this.userService.findOne({ username });

    if (!user) return null;

    // Validate user password against hashed password
    const isPasswordValid = await Bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
