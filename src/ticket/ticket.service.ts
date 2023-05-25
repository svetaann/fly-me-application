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
import { Airport } from "src/airport/airport.entity";


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
        private readonly passengerRepository: Repository<Passenger>,
        @InjectRepository(Airport)
        private readonly airportRepository: Repository<Airport>
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

    async findFullOne(id: number): Promise<FullTicket>{
        const fullTicket = new FullTicket()
        const ticket = await this.ticketRepository.findOne({where:{id}, relations:{plane: true, flight: true, passenger: true}})
        fullTicket.class = ticket.class;
        fullTicket.date = ticket.date;
        fullTicket.gate = ticket.gate;
        fullTicket.seat = ticket.seat;
        fullTicket.terminal = ticket.terminal;
        fullTicket.price = ticket.price;
        fullTicket.luggage = ticket.luggage;
        fullTicket.food = ticket.food;
        fullTicket.passengerName = ticket.passenger.fullname
        fullTicket.plane = ticket.plane.name
        fullTicket.flight = ticket.flight.name
        fullTicket.startTime = ticket.flight.start_time
        fullTicket.endTime = ticket.flight.end_time
        return fullTicket
    }

    async findAll(): Promise<Ticket[]> {
        return await this.ticketRepository.find();
    }
    async findTickets(from: string, to: string, date: string): Promise<FullTicket[]>{
        const tickets = await this.ticketRepository.find({where:{date:date}, relations: {flight: true, plane:true}})
        const fromAiroports = await this.airportRepository.find({where: {city: from}})
        const toAirports = await this.airportRepository.find({where:{city: to}})
        const flights = await this.flightRepository.find({relations: {to_airport:true, from_airport:true}})
        console.log(tickets)
        console.log(fromAiroports)
        console.log(toAirports)
        console.log(flights)
        let needFlights: Flight[]
        needFlights = []
        for(const f of flights){
            for(const fa of fromAiroports){
                if (f.from_airport.id == fa.id){
                    for(const ta of toAirports){
                        if (f.to_airport.id == ta.id){
                            needFlights.push(f)
                        }
                    }
                }
            }
        }
        console.log(5)
        console.log(needFlights)
        let needTickets: FullTicket[]
        needTickets = []
        for(let t of tickets){
            for(let nf of needFlights){
                if (t.flight.id == nf.id){
                    const fullticket = new FullTicket()
                    fullticket.class = t.class
                    fullticket.date = t.date
                    fullticket.endTime = t.flight.end_time
                    fullticket.flight = t.flight.name
                    // fullticket.from_city = t.flight.from_airport.city
                    fullticket.gate = t.gate
                    fullticket.plane = t.plane.name
                    fullticket.price = t.price
                    fullticket.seat = t.seat
                    fullticket.startTime = t.flight.start_time
                    fullticket.terminal = t.terminal
                    // fullticket.to_city = t.flight.to_airport.city
                    needTickets.push(fullticket)
                }
            }
        }
        console.log(needTickets)
        return needTickets;
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