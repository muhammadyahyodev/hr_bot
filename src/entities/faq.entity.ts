import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { QuestionStatus } from "../utils/enums";

@Entity({ name: "faq" })
export class Faq {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    question!: string;

    @Column({ nullable: true })
    answer!: string;

    @Column({ nullable: false, default: QuestionStatus.OPEN })
    status!: QuestionStatus;

    @Column({ nullable: true, default: new Date()})
    createdAt!: Date

    @Column({ nullable: true })
    updatedAt!: Date
}