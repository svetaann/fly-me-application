import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

@Module({

controllers: [PassengerController],

providers: [PassengerService],

imports: [DatasourceModule]

})

export class PassengerModule {}