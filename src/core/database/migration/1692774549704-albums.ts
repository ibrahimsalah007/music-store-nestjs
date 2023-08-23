import { MigrationInterface, QueryRunner } from 'typeorm';

export class Albums1692774549704 implements MigrationInterface {
  name = 'Albums1692774549704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "artworkUrl" character varying NOT NULL, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "albums"`);
  }
}
