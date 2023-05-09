import { type } from "os";
import { Flight } from "src/flight/flight.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:'airport'})
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    iata: string;
    @Column()
    city: string;
    
    @OneToMany(type => Flight, flight => flight.from_airport)
    flights: Flight[];
    @OneToMany(type => Flight, flight => flight.to_airport)
    flights2: Flight[];
    }
