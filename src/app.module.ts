import {Module} from '@nestjs/common'
import { PlaneModule } from './plane/plane.module';
import { DatasourceModule } from './datasource/datasource.module';
import { AirportModule } from './airport/airport.module';
import { PassengerModule } from './passenger/passenger.module';

@Module({
    imports: [PlaneModule, DatasourceModule, AirportModule, PassengerModule],
    controllers: [],
    providers: [],
})
export class AppModule {}