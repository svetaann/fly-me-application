
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';



@Controller('ticket')
export class TicketController {
    constructor(
        private readonly ticketService: TicketService) {}

    @Get()
    findAll() {
        return this.ticketService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ticketService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTicket: Ticket) {
        return this.ticketService.update(+id, updateTicket);
    }
    @Post()
    create(@Body() createTicket: Ticket) {
        return this.ticketService.create(createTicket);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ticketService.remove(+id);
    }



}
