import { FindOptionsSelect } from 'typeorm';

export interface QueryParam<T> {
  filter?: any;
  search?: string;
  select: FindOptionsSelect<T>;
  include: string[];
}
