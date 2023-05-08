import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Plane } from "./plane.entity";

@Injectable()

export class PlaneService {
    constructor(
        private readonly datasourceService: DatasourceService) {}

    create(plane: Plane) {

        this.datasourceService.getPlanes().push(plane);
            
        return plane;
            
    }

    findOne(id: number) {

        return this.datasourceService
        
        .getPlanes()
        
        .find((plane) => plane.id === id);
        
    }
    findAll(): Plane[] {
        return this.datasourceService.getPlanes();
    }
    update(id: number, updatedPlane: Plane) {
        const index = this.datasourceService
          .getPlanes()
          .findIndex((plane) => plane.id === id);
        this.datasourceService.getPlanes()[index] = updatedPlane;
        return this.datasourceService.getPlanes()[index];
    }
    remove(id: number) {
        const index = this.datasourceService
          .getPlanes()
          .findIndex((plane) => plane.id === id);
        this.datasourceService.getPlanes().splice(index, 1);
        return HttpStatus.OK;
      }
    
    
    
    
}