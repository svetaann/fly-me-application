import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { Airport } from "src/airport/airport.entity";
import { AirportService } from "src/airport/airport.service";
import { Ticket } from "src/ticket/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'flight' })
export class Flight {
    @ApiProperty({ example: '1', description: 'Идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'GH764', description: 'Номер рейса' })
    @Column()
    name: string;

    @ApiProperty({ example: '12:34', description: 'Время вылета' })
    @Column()
    start_time: string;

    @ApiProperty({ example: '12:34', description: 'Время прилета' })
    @Column()
    end_time: string;

    @ManyToOne(type => Airport, from_airport => from_airport.flights)
    @JoinColumn({ name: "from_airport_id" })
    from_airport: Airport

    @ManyToOne(type => Airport, to_airport => to_airport.flights2)
    @JoinColumn({ name: "to_airport_id" })
    to_airport: Airport

    @OneToMany(type => Ticket, ticket => ticket.flight)
    tickets: Ticket[];
}