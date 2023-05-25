
import { Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTicket } from './createTicket.dto';



@Controller('ticket')
@ApiTags('Билет')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get()
    findAll() {
        return this.ticketService.findAll();
    }
    @Get('/find')
    findTickets(@Query() params: any){
        return this.ticketService.findTickets(params.from,params.to, params.date);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ticketService.findOne(+id);
    }

    @Get('/full/:id')
    findFullOne(@Param('id') id: string) {
        return this.ticketService.findFullOne(+id);
    }
    
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTicket: Ticket) {
        return this.ticketService.update(+id, updateTicket);
    }

    @Post()
    create(@Body() createTicket: CreateTicket) {
        return this.ticketService.create(createTicket);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ticketService.remove(+id);
    }
}
