import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('int', {
        default: 0
    })
    date: number;

}
