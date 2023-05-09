import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Passenger } from "./passenger.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Injectable()
export class PassengerService {
    constructor(
        @InjectRepository(Passenger)
        private readonly passengerRepository: Repository<Passenger>) {}

    async create(passenger: Passenger): Promise<Passenger> {

        const newPassenger = await this.passengerRepository.create(passenger)
        newPassenger.fullname = passenger.fullname;
        newPassenger.birth_date = passenger.birth_date;
        newPassenger.passport = passenger.passport;
        await this.passengerRepository.save(newPassenger);
        return passenger

    }

    findOne(id: number): Promise<Passenger> {

        return this.passengerRepository.findOne({where:{id}});
        
    }

    async findAll(): Promise<Passenger[]> {
        return this.passengerRepository.find();
    }

    async update(id: number, updatedPassenger: Passenger) {
        const passenger = await this.passengerRepository.findOne({where:{id}});
        passenger.fullname = updatedPassenger.fullname;
        passenger.birth_date = updatedPassenger.birth_date;
        passenger.passport = updatedPassenger.passport;
        await this.passengerRepository.save(passenger)
        return passenger
    }

    remove(id: number) {
        this.passengerRepository.delete({id})
      }
    
    
    
    
}