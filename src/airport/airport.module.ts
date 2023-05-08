import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';

@Module({

controllers: [AirportController],

providers: [AirportService],

imports: [DatasourceModule]

})

export class AirportModule {}