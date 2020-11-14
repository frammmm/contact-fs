import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1601829978377 implements MigrationInterface {
    name = 'migration1601829978377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "header" character varying NOT NULL, "body" character varying NOT NULL, "timestamp" integer NOT NULL, "complete" boolean NOT NULL, "file_url" character varying NOT NULL, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hash" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hash"`);
        await queryRunner.query(`DROP TABLE "request"`);
    }

}
