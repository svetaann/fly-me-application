import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { Ticket } from "./ticket.entity";

@Injectable()
export class TicketService {
    constructor(
        private readonly datasourceService: DatasourceService) {}

    create(ticket: Ticket) {

        this.datasourceService.getTickets().push(ticket);
            
        return ticket;
            
    }

    findOne(id: number) {

        return this.datasourceService
        
        .getTickets()
        
        .find((ticket) => ticket.id === id);
        
    }
    findAll(): Ticket[] {
        return this.datasourceService.getTickets();
    }
    update(id: number, updatedTicket: Ticket) {
        const index = this.datasourceService
          .getTickets()
          .findIndex((ticket) => ticket.id === id);
        this.datasourceService.getTickets()[index] = updatedTicket;
        return this.datasourceService.getTickets()[index];
    }
    remove(id: number) {
        const index = this.datasourceService
          .getTickets()
          .findIndex((ticket) => ticket.id === id);
        this.datasourceService.getTickets().splice(index, 1);
        return HttpStatus.OK;
      }
    
    
    
    
}