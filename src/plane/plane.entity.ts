import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:'plane'})
export class Plane {
    @ApiProperty({ example: '1', description: 'Идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: 'Boeing 737', description: 'Название самолета' })
    @Column()
    name: string;
    @ApiProperty({ example: '250', description: 'Количество мест' })
    @Column()
    seats_amount: number;
    
    }