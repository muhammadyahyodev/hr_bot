import { BeforeInsert, BeforeRemove, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { QuestionStatus } from "../utils/enums";
import { AppDataSource } from "../database/data-source";
import { incrementPosition } from "../utils/helpers";

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

    @Column()
    position!: number;

    @Column({ nullable: true, default: new Date()})
    createdAt!: Date

    @Column({ nullable: true })
    updatedAt!: Date


    @BeforeInsert()
    async beforeInsertFaq() {

        const [faq] = await AppDataSource.manager.find(Faq, {
            order: {
                position: "DESC"
            },
            take: 1
        });

        this.position = incrementPosition(faq?.position);

    }
   
    @BeforeRemove()
    async beforeRemoveFaq() {
    
        await AppDataSource
            .createQueryBuilder(Faq, 'c')
            .update()
            .set({
                position: ()=> `position - 1`
            })
            .where(`position > :currentPosition`, { currentPosition: this.position })
            .execute();
    
    }
}
