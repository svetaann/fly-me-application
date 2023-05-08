import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Flight } from "./flight.entity";

@Injectable()

export class FlightService {
    constructor(
        private readonly datasourceService: DatasourceService) {}

    create(flight: Flight) {

        this.datasourceService.getFlights().push(flight);
            
        return flight;
            
    }

    findOne(id: number) {

        return this.datasourceService
        
        .getFlights()
        
        .find((flight) => flight.id === id);
        
    }
    findAll(): Flight[] {
        return this.datasourceService.getFlights();
    }
    update(id: number, updatedFlight: Flight) {
        const index = this.datasourceService
          .getFlights()
          .findIndex((flight) => flight.id === id);
        this.datasourceService.getFlights()[index] = updatedFlight;
        return this.datasourceService.getFlights()[index];
    }
    remove(id: number) {
        const index = this.datasourceService
          .getFlights()
          .findIndex((flight) => flight.id === id);
        this.datasourceService.getFlights().splice(index, 1);
        return HttpStatus.OK;
      }
    
    
    
    
}