import { Module } from '@nestjs/common'
import { PlaneModule } from './plane/plane.module';
import { DatasourceModule } from './datasource/datasource.module';
import { AirportModule } from './airport/airport.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { TicketModule } from './ticket/ticket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport/airport.entity';
import { Flight } from './flight/flight.entity';
import { Plane } from './plane/plane.entity';
import { Passenger } from './passenger/passenger.entity';
import { Ticket } from './ticket/ticket.entity';
import { CreateTicket } from './ticket/createTicket.dto';

@Module({
    imports: [PlaneModule, DatasourceModule, AirportModule, PassengerModule
        , FlightModule, TicketModule, TypeOrmModule.forRoot({
            type: 'postgres',
            port: 5432,
            database: 'flyme',
            username: 'postgres',
            password: '12203044',
            host: 'localhost',
            synchronize: false,
            logging: 'all',
            entities: [Airport, Flight, Plane, Passenger, Ticket]
        })],
    controllers: [],
    providers: [],
})
export class AppModule { }