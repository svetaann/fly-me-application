import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Passenger } from "./passenger.entity";


@Injectable()

export class PassengerService {
    constructor(
        private readonly datasourceService: DatasourceService) {}

    create(passenger: Passenger) {

        this.datasourceService.getPassengers().push(passenger);
            
        return passenger;
            
    }

    findOne(id: number) {

        return this.datasourceService
        
        .getPassengers()
        
        .find((passenger) => passenger.id === id);
        
    }
    findAll(): Passenger[] {
        return this.datasourceService.getPassengers();
    }
    update(id: number, updatedPassenger: Passenger) {
        const index = this.datasourceService
          .getPassengers()
          .findIndex((passenger) => passenger.id === id);
        this.datasourceService.getPassengers()[index] = updatedPassenger;
        return this.datasourceService.getPassengers()[index];
    }
    remove(id: number) {
        const index = this.datasourceService
          .getPassengers()
          .findIndex((passenger) => passenger.id === id);
        this.datasourceService.getPassengers().splice(index, 1);
        return HttpStatus.OK;
      }
    
    
    
    
}