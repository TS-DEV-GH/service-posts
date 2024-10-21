import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    AfterUpdate
} from "typeorm";

@Entity()
export class Posts {
    @ObjectIdColumn({name: '_id', nullable: false})
    _id?: ObjectId;

    @Column({nullable: false})
    title?: string;

    @Column({nullable: false})
    description?: string;

    @Column({nullable: false})
    images?: string[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column('boolean', {nullable: false, default: true, name: 'archive'})
    archive?: boolean = false;

    @AfterUpdate()
    update() {
        this.updatedAt = new Date();
    }
}
