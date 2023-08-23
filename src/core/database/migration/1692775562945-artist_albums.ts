import { MigrationInterface, QueryRunner } from "typeorm";

export class ArtistAlbums1692775562945 implements MigrationInterface {
    name = 'ArtistAlbums1692775562945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist_albums" ("artistsId" integer NOT NULL, "albumsId" integer NOT NULL, CONSTRAINT "PK_7853197f9ae26f5c4b7c3e5dccc" PRIMARY KEY ("artistsId", "albumsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8911b2ba200b6a6e263a75f63" ON "artist_albums" ("artistsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d383932c2863eed57f62d4c5c0" ON "artist_albums" ("albumsId") `);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "FK_f8911b2ba200b6a6e263a75f638" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "FK_d383932c2863eed57f62d4c5c05" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "FK_d383932c2863eed57f62d4c5c05"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "FK_f8911b2ba200b6a6e263a75f638"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d383932c2863eed57f62d4c5c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8911b2ba200b6a6e263a75f63"`);
        await queryRunner.query(`DROP TABLE "artist_albums"`);
    }

}
