import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {
  Between,
  FindManyOptions,
  FindOptionsRelations,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

import { QueryParam } from 'App/core';

@Injectable()
export class FindOptionsBuilderPipe<T> implements PipeTransform {
  private readonly operatorsMap = {
    eq: (value: any) => value,
    neq: (value: any) => Not(value),
    gt: (value: any) => MoreThan(value),
    gte: (value: any) => MoreThanOrEqual(value),
    lt: (value: any) => LessThan(value),
    lte: (value: any) => LessThanOrEqual(value),
    in: (value: any) => In(value),
    search: (value: any) => ILike(`%${value}%`),
    between: (value: any) => Between(value[0], value[1]),
  };

  transform(value: QueryParam<T>) {
    /**
     * @param query represent the query that has to be built based on the incoming values
     */
    const query: FindManyOptions<T> = {
      where: {},
    };

    /**
     * @param filter represent incoming filter values
     */
    const filters = value.filter;

    /**
     * @param search  represent incoming search value
     */
    const search = value.search;

    /**
     * @param relations  represent relations that has to be included in the response based on the given relations array of strings as a parameter to the function call
     */
    const relations = value.include;

    /**
     * @param select  represent incoming select value
     */
    const select = value.select;

    if (relations) query.select = select;
    if (relations) query.relations = this.relationsMapper(relations);

    for (const field in filters) {
      const operator = Object.keys(filters[field])[0];

      const fieldValue = filters[field][operator];

      query.where[field] = this.buildOperator(operator, fieldValue);
    }

    return query;
  }

  /**
   *
   * @param operator  represent the operator that has to be used in the query
   * @param value  represent the value that has to be used in the query
   * @returns A mapped operator with the value
   */
  private buildOperator(operator: string, value: any) {
    const mappedOperator = this.operatorsMap[operator];

    if (mappedOperator) {
      return mappedOperator(value);
    }

    throw new BadRequestException(`Unsupported operator: ${operator}`);
  }

  /**
   *
   * @param relations  represent relations that has to be included in the response based on the given relations array of strings as a parameter to the function call
   * @returns FindOptionsRelations<T>
   */
  private relationsMapper(relations: string[]): FindOptionsRelations<T> {
    const mappedRelations: FindOptionsRelations<T> = {};

    relations.map((relation) => {
      mappedRelations[relation] = true;
    });

    return mappedRelations;
  }
}
