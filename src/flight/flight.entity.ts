import { type } from "os";
import { Airport } from "src/airport/airport.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'flight'})
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    // @Column()
    // from_airport_id: number;
    // @Column()
    // to_airport_id: number;
    @Column()
    start_time: string;
    @Column()
    end_time: string;
    
    @ManyToOne(type => Airport, from_airport => from_airport.flights)
    from_airport: Airport
    @ManyToOne(type => Airport, to_airport => to_airport.flights2)
    to_airport: Airport
}