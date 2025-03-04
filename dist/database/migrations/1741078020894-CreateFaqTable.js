"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFaqTable1741078020894 = void 0;
class CreateFaqTable1741078020894 {
    constructor() {
        this.name = 'CreateFaqTable1741078020894';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying, "status" character varying NOT NULL DEFAULT 'open', "createdAt" TIMESTAMP DEFAULT '"2025-03-04T08:47:01.980Z"', "updatedAt" TIMESTAMP, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "faq"`);
    }
}
exports.CreateFaqTable1741078020894 = CreateFaqTable1741078020894;
