import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Flight } from "./flight.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()

export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private readonly flightService: Repository<Flight>) {}

    async create(flight: Flight) {

        const newflight = await this.flightService.create(flight)
        newflight.name = flight.name
        newflight.start_time = flight.start_time
        newflight.end_time = flight.end_time
        newflight.from_airport = flight.from_airport
        newflight.to_airport = flight.to_airport
        await this.flightService.save(newflight)
            
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