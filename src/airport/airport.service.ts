import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Airport } from "./airport.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AirportService {
    constructor(

        @InjectRepository(Airport)
        private readonly airportRepository: Repository<Airport>){}

    async create(airport: Airport): Promise<Airport> 
    {
        const airport2 = await this.airportRepository.create(airport);
        airport2.name = airport.name;
        airport2.iata = airport.iata;
        airport2.city = airport.city;
        await this.airportRepository.save(airport2);
        return airport;
            
    }

    findOne(id: number): Promise<Airport> {
        return this.airportRepository.findOne({where: {id}});
        
    }
    async findAll(): Promise<Airport[]> {
        return await this.airportRepository.find();
    }

    async update(id: number, updatedAirport: Airport) {
        const airport = await this.airportRepository.findOne({where:{id}});
        airport.city = updatedAirport.city
        airport.iata = updatedAirport.iata
        airport.name = updatedAirport.name
        await this.airportRepository.save(airport)
        return airport
    }

    remove(id: number) {
        this.airportRepository.delete({id})
      }
    
}