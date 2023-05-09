import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Ticket } from "./ticket.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>) {}

    async create(ticket: Ticket): Promise<Ticket> {

        const newTicket = await this.ticketRepository.create(ticket)
        newTicket.class = ticket.class;
        newTicket.terminal = ticket.terminal;
        newTicket.seat = ticket.seat;
        newTicket.gate = ticket.gate;
        newTicket.date = ticket.date;
        newTicket.food = ticket.food;
        newTicket.luggage = ticket.luggage;
        newTicket.price = ticket.price;
        newTicket.flight = ticket.flight;
        newTicket.plane = ticket.plane;
        newTicket.passenger = ticket.passenger;
        await this.ticketRepository.save(newTicket)
        return ticket
    }

    findOne(id: number): Promise<Ticket> {

        return this.ticketRepository.findOne({where: {id}})
        
    }

    async findAll(): Promise<Ticket[]> {
        return await this.ticketRepository.find();
    }

    async update(id: number, updatedTicket: Ticket) {
        const ticket = await this.ticketRepository.findOne({where:{id}})
        ticket.class = updatedTicket.class;
        ticket.terminal = updatedTicket.terminal;
        ticket.seat = updatedTicket.seat;
        ticket.gate = updatedTicket.gate;
        ticket.date = updatedTicket.date;
        ticket.food = updatedTicket.food;
        ticket.luggage = updatedTicket.luggage;
        ticket.price = updatedTicket.price;
        ticket.passenger = updatedTicket.passenger;
        ticket.plane = updatedTicket.plane;
        ticket.flight = updatedTicket.flight;
        await this.ticketRepository.save(ticket)
        return ticket
    }

    remove(id: number) {
        this.ticketRepository.delete({id})
    }
    
    
    
    
}