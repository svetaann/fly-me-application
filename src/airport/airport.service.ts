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


        //this.datasourceService.getAirports().push(airport);
            
        return airport;
            
    }

    findOne(id: number): Promise<Airport> {
        return this.airportRepository.findOne({
            where: {id},

        });
        
    }
    async findAll(): Promise<Airport[]> {
        return await this.airportRepository.find();
        // const airports = await this.airportRepository.find();
        // return airports;
        //return this.datasourceService.getAirports();
    }
    async update(id: number, updatedAirport: Airport) {
        const airport = await this.airportRepository.findOne({where:{id}});
        airport.city = updatedAirport.city
        airport.iata = updatedAirport.iata
        airport.name = updatedAirport.name
        await this.airportRepository.save(airport)
        return airport
        // const index = this.datasourceService
        //   .getAirports()
        //   .findIndex((airport) => airport.id === id);
        // this.datasourceService.getAirports()[index] = updatedAirport;
        // return this.datasourceService.getAirports()[index];
    }
    remove(id: number) {
        this.airportRepository.delete({id})
        // const index = this.datasourceService
        //   .getAirports()
        //   .findIndex((airport) => airport.id === id);
        // this.datasourceService.getAirports().splice(index, 1);
        // return HttpStatus.OK;
      }
    
    
    
    
}