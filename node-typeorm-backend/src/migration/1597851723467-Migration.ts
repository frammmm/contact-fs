import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1597851723467 implements MigrationInterface {
    name = 'Migration1597851723467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
