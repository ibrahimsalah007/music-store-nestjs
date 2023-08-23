import { ApiProperty } from '@nestjs/swagger';
import { User } from 'App/user/user.entity';

export class ApiResponseDto<T> {
  @ApiProperty()
  data: T;
}
