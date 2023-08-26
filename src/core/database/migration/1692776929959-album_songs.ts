import { MigrationInterface, QueryRunner } from "typeorm";

export class AlbumSongs1692776929959 implements MigrationInterface {
    name = 'AlbumSongs1692776929959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" ADD "albumId" integer`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_3807642f5c436d2492f486567fc" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_3807642f5c436d2492f486567fc"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "albumId"`);
    }

}
