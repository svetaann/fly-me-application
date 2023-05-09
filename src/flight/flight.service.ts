import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Flight } from "./flight.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()

export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>) {}

    async create(flight: Flight): Promise<Flight> {

        const newflight = await this.flightRepository.create(flight)
        newflight.name = flight.name
        newflight.start_time = flight.start_time
        newflight.end_time = flight.end_time
        newflight.from_airport = flight.from_airport
        newflight.to_airport = flight.to_airport
        await this.flightRepository.save(newflight)
        return flight;
            
    }

    findOne(id: number): Promise<Flight> {

        return this.flightRepository.findOne({where: {id}})
        
    }

    async findAll(): Promise<Flight[]> {
        return await this.flightRepository.find();
    }

    async update(id: number, updatedFlight: Flight) {
        const flight = await this.flightRepository.findOne({where:{id}})
        flight.name = updatedFlight.name
        flight.from_airport = updatedFlight.from_airport
        flight.to_airport = updatedFlight.to_airport
        flight.start_time = updatedFlight.start_time
        flight.end_time = updatedFlight.end_time
        await this.flightRepository.save(flight)
        return flight
    }

    remove(id: number) {
        this.flightRepository.delete({id})
      }
    
    
    
    
}