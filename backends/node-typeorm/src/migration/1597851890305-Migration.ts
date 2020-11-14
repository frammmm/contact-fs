import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1597851890305 implements MigrationInterface {
    name = 'Migration1597851890305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86" FOREIGN KEY ("roleIdId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleIdId"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
