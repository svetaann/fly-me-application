import { Injectable } from '@nestjs/common';
import { Plane } from 'src/plane/plane.entity';

@Injectable()

export class DatasourceService {

private planes: Plane[] = [];

getPlanes(): Plane[] {

return this.planes;

}

}