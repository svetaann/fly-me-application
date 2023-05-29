import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport.entity';
import { Flight } from 'src/flight/flight.entity';
import { Ticket } from 'src/ticket/ticket.entity';

@Module({

    controllers: [AirportController],

    providers: [AirportService],

    imports: [TypeOrmModule.forFeature([Airport, Flight, Ticket])]

})

export class AirportModule { }