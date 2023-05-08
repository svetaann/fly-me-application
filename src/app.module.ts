import {Module} from '@nestjs/common'
import { PlaneModule } from './plane/plane.module';
import { DatasourceModule } from './datasource/datasource.module';
import { AirportModule } from './airport/airport.module';

@Module({
    imports: [PlaneModule, DatasourceModule, AirportModule],
    controllers: [],
    providers: [],
})
export class AppModule {}