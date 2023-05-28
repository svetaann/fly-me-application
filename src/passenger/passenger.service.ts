import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Passenger } from "./passenger.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IncompletePassenger } from "./incompletePassenger.dto";
import { Ticket } from "src/ticket/ticket.entity";



@Injectable()
export class PassengerService {
    constructor(
        @InjectRepository(Passenger)
        private readonly passengerRepository: Repository<Passenger>,
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>
    ) { }

    async create(passenger: Passenger): Promise<Passenger> {

        const newPassenger = await this.passengerRepository.create(passenger)
        newPassenger.fullname = passenger.fullname;
        newPassenger.birth_date = passenger.birth_date;
        newPassenger.passport = passenger.passport;
        newPassenger.email = passenger.email;
        await this.passengerRepository.save(newPassenger);
        return passenger

    }

    async findOne(id: number): Promise<IncompletePassenger> {

        const passenger = await this.passengerRepository.findOne({ where: { id }, relations: { tickets: true } });
        const ans = new IncompletePassenger()
        ans.fullname = passenger.fullname
        ans.birth_date = passenger.birth_date
        const tickets = await this.ticketRepository.find({ where: { passenger: { id: passenger.id } } })
        ans.ticketList = []
        for (let ticket of tickets) {
            ans.ticketList.push(ticket.id)
        }
        return ans
    }

    async findAll(): Promise<Passenger[]> {
        return this.passengerRepository.find();
    }

    async update(id: number, updatedPassenger: Passenger) {
        const passenger = await this.passengerRepository.findOne({ where: { id } });
        passenger.fullname = updatedPassenger.fullname;
        passenger.birth_date = updatedPassenger.birth_date;
        passenger.passport = updatedPassenger.passport;
        passenger.email = updatedPassenger.email
        await this.passengerRepository.save(passenger)
        return passenger
    }

    remove(id: number) {
        this.passengerRepository.delete({ id })
    }




}