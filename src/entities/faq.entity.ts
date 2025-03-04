import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "faq" })
export class Faq {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    question!: string;

    @Column({ nullable: true })
    answer!: string;

    @Column()
    createdAt!: Date

    @Column()
    updatedAt!: Date
}