import { Injectable } from '@nestjs/common';
import { Airport } from 'src/airport/airport.entity';
import { Plane } from 'src/plane/plane.entity';

@Injectable()

export class DatasourceService {

private planes: Plane[] = [];
private airports: Airport[] = [];

getPlanes(): Plane[] {
return this.planes;
}

getAirports():Airport[]{
    return this.airports;
}

}