import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(3)
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  // @IsStrongPassword(
  //   {},
  //   {
  //     message: i18nValidationMessage('validation.STRONG_PASSWORD'),
  //   },
  // )
  @IsString()
  password: string;
}
