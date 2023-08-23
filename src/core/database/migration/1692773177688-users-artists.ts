import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersArtists1692773177688 implements MigrationInterface {
    name = 'UsersArtists1692773177688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying, "password" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "bio" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_f7bd9114dc2849a90d39512911" UNIQUE ("userId"), CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "artists" ADD CONSTRAINT "FK_f7bd9114dc2849a90d39512911b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artists" DROP CONSTRAINT "FK_f7bd9114dc2849a90d39512911b"`);
        await queryRunner.query(`DROP TABLE "artists"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
