import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Plane } from 'src/plane/plane.entity';
import { Flight } from 'src/flight/flight.entity';
import { Passenger } from 'src/passenger/passenger.entity';
import { Airport } from 'src/airport/airport.entity';

@Module({

    controllers: [TicketController],

    providers: [TicketService],

    imports: [TypeOrmModule.forFeature([Ticket, Flight, Passenger, Plane, Airport])]

})
export class TicketModule { }