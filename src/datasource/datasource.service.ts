import { Injectable } from '@nestjs/common';
import { Airport } from 'src/airport/airport.entity';
import { Passenger } from 'src/passenger/passenger.entity';
import { Plane } from 'src/plane/plane.entity';

@Injectable()

export class DatasourceService {

private planes: Plane[] = [];
private airports: Airport[] = [];
private passengers: Passenger[] = [];

getPlanes(): Plane[] {
return this.planes;
}

getAirports():Airport[]{
    return this.airports;
}

getPassengers():Passenger[]{
    return this.passengers;
}

}