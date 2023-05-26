import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { Airport } from "src/airport/airport.entity";
import { Flight } from "src/flight/flight.entity";
import { Passenger } from "src/passenger/passenger.entity";
import { Plane } from "src/plane/plane.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ticket'})
export class Ticket {
    @ApiProperty({ example: '1', description: 'Идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Эконом', description: 'Класс комфорта' })
    @Column()
    class: string;

    @ApiProperty({ example: 'A', description: 'Терминал' })
    @Column()
    terminal: string;

    @ApiProperty({ example: '12F', description: 'Номер места' })
    @Column()
    seat: string;

    @ApiProperty({ example: '133', description: 'Выход на посадку' })
    @Column()
    gate: string;

    @ApiProperty({ example: '2023-05-22', description: 'Дата перелета' })
    @Column()
    date: string;

    @ApiProperty({ example: 'true', description: 'Наличие питания' })
    @Column()
    food: boolean;

    @ApiProperty({ example: 'true', description: 'Наличие багажа' })
    @Column()
    luggage: boolean;

    @ApiProperty({ example: '2300', description: 'Цена' })
    @Column()
    price: number;

    @ManyToOne(type => Passenger, passenger => passenger.tickets)
    @JoinColumn({name:"passenger_id"})
    passenger: Passenger

    @ManyToOne(type => Plane, plane => plane.tickets)
    @JoinColumn({name:"plane_id"})
    plane: Plane

    @ManyToOne(type => Flight, flight => flight.tickets)
    @JoinColumn({name:"flight_id"})
    flight: Flight

    
    // @ManyToOne(type => Airport)
    // @JoinTable({
    //     name: "flight",
    //     joinColumn: {
    //         name: "flight_id",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "to_airport_id",
    //         referencedColumnName: "id"
    //     }
    // })
    // toAirport: Airport;
}
    