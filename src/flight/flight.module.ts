import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({

controllers: [FlightController],

providers: [FlightService],

imports: [DatasourceModule]

})

export class FlightModule {}