import {Module} from '@nestjs/common'
import { PlaneModule } from './plane/plane.module';
import { DatasourceModule } from './datasource/datasource.module';
import { AirportModule } from './airport/airport.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
    imports: [PlaneModule, DatasourceModule, AirportModule, PassengerModule, FlightModule, TicketModule],
    controllers: [],
    providers: [],
})
export class AppModule {}