import { MigrationInterface, QueryRunner } from "typeorm";

export class ArtistSongs1692776611758 implements MigrationInterface {
    name = 'ArtistSongs1692776611758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "FK_f8911b2ba200b6a6e263a75f638"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "FK_d383932c2863eed57f62d4c5c05"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8911b2ba200b6a6e263a75f63"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d383932c2863eed57f62d4c5c0"`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist_songs" ("artist_id" integer NOT NULL, "song_id" integer NOT NULL, CONSTRAINT "PK_7970d7658bf74e4f34d5f3cc25a" PRIMARY KEY ("artist_id", "song_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72e29322d83b35770506756c8e" ON "artist_songs" ("artist_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ae8250a9ef0b740c6eb59f2244" ON "artist_songs" ("song_id") `);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "PK_7853197f9ae26f5c4b7c3e5dccc"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "PK_d383932c2863eed57f62d4c5c05" PRIMARY KEY ("albumsId")`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP COLUMN "artistsId"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "PK_d383932c2863eed57f62d4c5c05"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP COLUMN "albumsId"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD "artist_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "PK_6abcd5fa00447e7f8d1d945449d" PRIMARY KEY ("artist_id")`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD "album_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "PK_6abcd5fa00447e7f8d1d945449d"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "PK_a3cab1d1cde3cda4391dfeb39af" PRIMARY KEY ("artist_id", "album_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_6abcd5fa00447e7f8d1d945449" ON "artist_albums" ("artist_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1d91049cde74559996b5d1fb5" ON "artist_albums" ("album_id") `);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "FK_6abcd5fa00447e7f8d1d945449d" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "FK_e1d91049cde74559996b5d1fb5b" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist_songs" ADD CONSTRAINT "FK_72e29322d83b35770506756c8ed" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "artist_songs" ADD CONSTRAINT "FK_ae8250a9ef0b740c6eb59f2244d" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist_songs" DROP CONSTRAINT "FK_ae8250a9ef0b740c6eb59f2244d"`);
        await queryRunner.query(`ALTER TABLE "artist_songs" DROP CONSTRAINT "FK_72e29322d83b35770506756c8ed"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "FK_e1d91049cde74559996b5d1fb5b"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "FK_6abcd5fa00447e7f8d1d945449d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1d91049cde74559996b5d1fb5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6abcd5fa00447e7f8d1d945449"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "PK_a3cab1d1cde3cda4391dfeb39af"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "PK_6abcd5fa00447e7f8d1d945449d" PRIMARY KEY ("artist_id")`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP COLUMN "album_id"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "PK_6abcd5fa00447e7f8d1d945449d"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP COLUMN "artist_id"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD "albumsId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "PK_d383932c2863eed57f62d4c5c05" PRIMARY KEY ("albumsId")`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD "artistsId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist_albums" DROP CONSTRAINT "PK_d383932c2863eed57f62d4c5c05"`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "PK_7853197f9ae26f5c4b7c3e5dccc" PRIMARY KEY ("artistsId", "albumsId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae8250a9ef0b740c6eb59f2244"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72e29322d83b35770506756c8e"`);
        await queryRunner.query(`DROP TABLE "artist_songs"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`CREATE INDEX "IDX_d383932c2863eed57f62d4c5c0" ON "artist_albums" ("albumsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8911b2ba200b6a6e263a75f63" ON "artist_albums" ("artistsId") `);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "FK_d383932c2863eed57f62d4c5c05" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist_albums" ADD CONSTRAINT "FK_f8911b2ba200b6a6e263a75f638" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
