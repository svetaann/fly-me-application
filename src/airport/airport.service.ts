import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Airport } from "./airport.entity";

@Injectable()

export class AirportService {
    constructor(
        private readonly datasourceService: DatasourceService) {}

    create(airport: Airport) {

        this.datasourceService.getAirports().push(airport);
            
        return airport;
            
    }

    findOne(id: number) {

        return this.datasourceService
        
        .getAirports()
        
        .find((airport) => airport.id === id);
        
    }
    findAll(): Airport[] {
        return this.datasourceService.getAirports();
    }
    update(id: number, updatedAirport: Airport) {
        const index = this.datasourceService
          .getAirports()
          .findIndex((airport) => airport.id === id);
        this.datasourceService.getAirports()[index] = updatedAirport;
        return this.datasourceService.getAirports()[index];
    }
    remove(id: number) {
        const index = this.datasourceService
          .getAirports()
          .findIndex((airport) => airport.id === id);
        this.datasourceService.getAirports().splice(index, 1);
        return HttpStatus.OK;
      }
    
    
    
    
}