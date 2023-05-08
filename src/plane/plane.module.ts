import { Module } from '@nestjs/common';
import { Plane } from './plane.entity';
import { PlaneController } from './plane.controller';
import { PlaneService } from './plane.service';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({

controllers: [PlaneController],

providers: [PlaneService],

imports: [DatasourceModule]

})

export class PlaneModule {}