import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1597855096915 implements MigrationInterface {
    name = 'Migration1597855096915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roleIdId" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role_id" TO "roleIdId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86" FOREIGN KEY ("roleIdId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
