import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Ticket } from "./ticket.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { CreateTicket } from "./createTicket.dto";
import { Flight } from "src/flight/flight.entity";
import { Plane } from "src/plane/plane.entity";
import { FullTicket } from "./fullTicket.dto";
import { Passenger } from "src/passenger/passenger.entity";
import { Airport } from "src/airport/airport.entity";
import {resolve} from 'path'
const PDFDocument = require('pdfkit-table')

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
    async findFullAll_forSale(): Promise<FullTicket[]>{
        const allFullTickets: FullTicket[] = []
        const allTickets = await this.ticketRepository.find({where:{passenger: IsNull()}, relations:{passenger:true, plane: true, flight: true}})
        
        for(const ticket of allTickets){
            const fullTicket = new FullTicket()
            fullTicket.id = ticket.id
            fullTicket.class = ticket.class
            fullTicket.terminal = ticket.terminal
            fullTicket.seat = ticket.seat
            fullTicket.gate = ticket.gate
            fullTicket.date = ticket.date
            fullTicket.price = ticket.price
            fullTicket.plane = ticket.plane.name
            const flight = await this.flightRepository.findOne({where:{id:ticket.flight.id}, relations:{to_airport: true, from_airport: true}})
            fullTicket.flight = flight.name
            fullTicket.startTime = flight.start_time
            fullTicket.endTime = flight.end_time
            fullTicket.from_airport = flight.from_airport.name
            fullTicket.to_airport = flight.to_airport.name
            fullTicket.from_iata = flight.from_airport.iata
            fullTicket.to_iata = flight.to_airport.iata
            fullTicket.from_city = flight.from_airport.city
            fullTicket.to_city = flight.to_airport.city
            allFullTickets.push(fullTicket)
        }
        return allFullTickets

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

    async userBoughtTicket(ticketId: number, addedPassenger: Passenger): Promise<Ticket>{
        const name = await addedPassenger.fullname
        const birthDate = addedPassenger.birth_date
        const passport = addedPassenger.passport
        const email = addedPassenger.email
        const findedPassengers = await this.passengerRepository.find({where:{fullname: name,birth_date:birthDate,passport: passport,email: email}})
        console.log(findedPassengers)
        if (findedPassengers.length == 0){
            const newPassenger = await this.passengerRepository.create()
            newPassenger.fullname = name
            newPassenger.birth_date = birthDate
            newPassenger.passport = passport
            newPassenger.email = email
            await this.passengerRepository.save(newPassenger)
        }
        const passenger = await this.passengerRepository.findOne({where:{fullname: name,birth_date:birthDate,passport: passport,email: email}})
        const ticket = await this.ticketRepository.findOne({where:{id:ticketId}})
        ticket.passenger = passenger
        await this.ticketRepository.save(ticket)
        return ticket
    }

    async findTickets(from: string, to: string, date: string): Promise<FullTicket[]>{
        const tickets = await this.ticketRepository.find({where:{passenger:IsNull(), date:date}, relations: {flight: true, plane:true, passenger: true}})
        console.log(tickets)
        const fromAiroports = await this.airportRepository.find({where: {city: from}})
        const toAirports = await this.airportRepository.find({where:{city: to}})
        const flights = await this.flightRepository.find({relations: {to_airport:true, from_airport:true}})
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
                    fullticket.id = t.id
                    fullticket.class = t.class
                    fullticket.date = t.date
                    fullticket.endTime = t.flight.end_time
                    fullticket.flight = t.flight.name
                    fullticket.from_airport = nf.from_airport.name
                    fullticket.gate = t.gate
                    fullticket.plane = t.plane.name
                    fullticket.price = t.price
                    fullticket.seat = t.seat
                    fullticket.startTime = t.flight.start_time
                    fullticket.terminal = t.terminal
                    fullticket.to_airport = nf.to_airport.name
                    fullticket.from_iata = nf.from_airport.iata
                    fullticket.to_iata = nf.to_airport.iata
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
    
    async generatePdf(ticketId: number): Promise<Buffer>{
        const ticket = await this.ticketRepository.findOne({where:{id:ticketId}, relations:{passenger:true, plane: true, flight: true}})
        const flight = await this.flightRepository.findOne({where:{id:ticket.flight.id}, relations:{to_airport: true, from_airport: true}})
        const pdfBuffer: Buffer = await new Promise( resolve => {
            const doc = new PDFDocument({
                size: "LETTER",
                bufferPages: true
            })
            const birth_string = ticket.passenger.birth_date
            let birth_date = new Date(birth_string)

            doc.font(`src/ofont.ru_Kanit Cyrillic.ttf`)
            doc.text("Пассажир:")
            doc.moveDown();
            doc.text(`ФИО: ${ticket.passenger.fullname} Дата рождения: ${(new Date(ticket.passenger.birth_date)).toLocaleDateString()} Паспорт:${ticket.passenger.passport}`)
            doc.moveDown();
            doc.moveDown();
            doc.text(`${flight.from_airport.city} - ${flight.to_airport.city}`)

            const buffer = []
            doc.on('data', buffer.push.bind(buffer))
            doc.on('end', () => {
                const data = Buffer.concat(buffer)
                resolve(data)
            })
            doc.end()
        })
        return pdfBuffer
    }
    
    
}