import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Ticket } from "src/ticket/ticket.entity";

@Entity({name:'passenger'})
export class Passenger {
    @ApiProperty({ example: '1', description: 'Идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: 'Анненкова Светлана Ярославовна', description: 'ФИО' })
    @Column()
    fullname: string;
    @ApiProperty({ example: '2004-04-20', description: 'Дата рождения' })
    @Column()
    birth_date: string;
    @ApiProperty({ example: '8018 123456', description: 'Номер паспорта' })
    @Column()
    passport: string;
    @OneToMany(type => Ticket, ticket => ticket.passenger)
    tickets: Ticket[];
    }