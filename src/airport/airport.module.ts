import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport.entity';
import { Flight } from 'src/flight/flight.entity';
import { Ticket } from 'src/ticket/ticket.entity';

@Module({

    controllers: [AirportController],

    providers: [AirportService],

    imports: [DatasourceModule, TypeOrmModule.forFeature([Airport, Flight, Ticket])]

})

export class AirportModule {}