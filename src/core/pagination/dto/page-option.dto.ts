import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderOption } from 'App/core';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsInt, Min, Max } from 'class-validator';

export class PageOptionDto {
  @ApiPropertyOptional({ enum: OrderOption, default: OrderOption.DESC })
  @IsEnum(OrderOption)
  @IsOptional()
  readonly orderBy?: OrderOption = OrderOption.DESC;

  @ApiPropertyOptional()
  @IsOptional()
  readonly sortBy?: string = 'id';

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  get order() {
    return { [this.sortBy]: this.orderBy };
  }
}
