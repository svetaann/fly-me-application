import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Ticket } from "./ticket.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTicket } from "./createTicket.dto";
import { Flight } from "src/flight/flight.entity";
import { Plane } from "src/plane/plane.entity";
import { FullTicket } from "./fullTicket.dto";
import { Passenger } from "src/passenger/passenger.entity";


@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
        @InjectRepository(Plane)
        private readonly planeRepository: Repository<Plane>,
        @InjectRepository(Passenger)
        private readonly passengerRepository: Repository<Passenger>
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

    // async findFullOne(id: number): Promise<FullTicket>{
    //     const fullTicket = new FullTicket()
    //     const ticket = await this.ticketRepository.findOne({where:{id}})
    //     fullTicket.class = ticket.class;
    //     fullTicket.date = ticket.date;
    //     fullTicket.gate = ticket.gate;
    //     fullTicket.seat = ticket.seat;

    //     fullTicket.terminal = ticket.terminal;
    //     fullTicket.price = ticket.price;
    //     fullTicket.luggage = ticket.luggage;
    //     fullTicket.food = ticket.food;
    //     //const passenger = ticket.passenger
    //     // const plane = ticket.plane
    //     // const flight = ticket.flight
        
    //     // fullTicket.passengerName = ticket.passenger.fullname
    //     // fullTicket.plane = ticket.plane.name
    //     // fullTicket.flight = ticket.flight.name
    //     // fullTicket.startTime = ticket.flight.start_time
    //     // fullTicket.endTime = ticket.flight.end_time
    //     return fullTicket
    // }

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