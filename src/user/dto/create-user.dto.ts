import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(3)
  @IsString()
  username: string;

  @ApiProperty()
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
