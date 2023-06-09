import { Module } from '@nestjs/common';
import { Plane } from './plane.entity';
import { PlaneController } from './plane.controller';
import { PlaneService } from './plane.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/ticket.entity';

@Module({

    controllers: [PlaneController],

    providers: [PlaneService],

    imports: [TypeOrmModule.forFeature([Plane, Ticket])]

})
export class PlaneModule { }