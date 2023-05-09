import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';

@Module({

controllers: [FlightController],

providers: [FlightService],

imports: [DatasourceModule, TypeOrmModule.forFeature([Flight])]

})

export class FlightModule {}