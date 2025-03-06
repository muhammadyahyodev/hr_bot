import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFaqTable1741238847461 implements MigrationInterface {
    name = 'CreateFaqTable1741238847461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying, "status" character varying NOT NULL DEFAULT 'open', "position" integer NOT NULL, "createdAt" TIMESTAMP DEFAULT '"2025-03-06T05:27:29.245Z"', "updatedAt" TIMESTAMP, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "faq"`);
    }

}
