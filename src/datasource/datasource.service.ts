import { Injectable } from '@nestjs/common';
import { Airport } from 'src/airport/airport.entity';
import { Flight } from 'src/flight/flight.entity';
import { Passenger } from 'src/passenger/passenger.entity';
import { Plane } from 'src/plane/plane.entity';
import { Ticket } from 'src/ticket/ticket.entity';

@Injectable()
export class DatasourceService {

    private planes: Plane[] = [];
    private airports: Airport[] = [];
    private passengers: Passenger[] = [];
    private flights: Flight[] = [];
    private tickets: Ticket[] = [];

    getPlanes(): Plane[] {
    return this.planes;
    }

    getAirports():Airport[]{
        return this.airports;
    }

    getPassengers():Passenger[]{
        return this.passengers;
    }

    getFlights():Flight[]{
        return this.flights;
    }

    getTickets():Ticket[]{
        return this.tickets;
    }
}