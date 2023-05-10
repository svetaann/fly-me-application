import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Ticket } from "./ticket.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTicket } from "./createTicket.dto";
import { Flight } from "src/flight/flight.entity";
import { Plane } from "src/plane/plane.entity";


@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
        @InjectRepository(Plane)
        private readonly planeRepository: Repository<Plane>
        ) {}

    async create(ticket: CreateTicket): Promise<CreateTicket> {

        const newTicket = await this.ticketRepository.create()
        newTicket.class = ticket.class;
        newTicket.terminal = ticket.terminal;
        newTicket.seat = ticket.seat;
        newTicket.gate = ticket.gate;
        newTicket.date = ticket.date;
        newTicket.price = ticket.price;
        const flightId = ticket.flight_id;
        const flight = await this.flightRepository.findOne({where:{id:flightId}}) ;
        const planeId = ticket.plane_id;
        const plane = await this.planeRepository.findOne({where:{id:planeId}})
        newTicket.flight = flight
        newTicket.plane = plane
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