import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { Flight } from "src/flight/flight.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'airport' })
export class Airport {
    @ApiProperty({ example: '1', description: 'Идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: 'Внуково', description: 'Название аэропорта' })
    @Column()
    name: string;
    @ApiProperty({ example: 'VKO', description: 'ИАТА аэропорта' })
    @Column()
    iata: string;
    @ApiProperty({ example: 'Москва', description: 'Город' })
    @Column()
    city: string;
    @OneToMany(type => Flight, flight => flight.from_airport)
    flights: Flight[];
    @OneToMany(type => Flight, flight => flight.to_airport)
    flights2: Flight[];
}
