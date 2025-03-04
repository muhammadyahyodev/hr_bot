import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFaqTable1741065689793 implements MigrationInterface {
    name = 'CreateFaqTable1741065689793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "faq"`);
    }

}
