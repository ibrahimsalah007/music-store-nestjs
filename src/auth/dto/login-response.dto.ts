import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'App/core';
import { User } from 'App/user/user.entity';

export class LoginResponseDto extends ApiResponseDto<User> {
  @ApiProperty()
  accessToken: string;
}
