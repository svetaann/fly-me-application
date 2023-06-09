import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plane } from 'src/plane/plane.entity';
import { Passenger } from './passenger.entity';
import { Ticket } from 'src/ticket/ticket.entity';

@Module({

    controllers: [PassengerController],

    providers: [PassengerService],

    imports: [TypeOrmModule.forFeature([Passenger, Ticket])]

})

export class PassengerModule { }