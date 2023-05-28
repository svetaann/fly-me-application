
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTicket } from './createTicket.dto';
import { Passenger } from 'src/passenger/passenger.entity';



@Controller('ticket')
@ApiTags('Билет')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get()
    findAll() {
        return this.ticketService.findAll();
    }
    @Get('/pdf/:ticketId')
    async generatePDF(@Res() res, @Param('ticketId') ticketId: number): Promise<void> {
        const buffer = await this.ticketService.generatePdf(ticketId);
        let dateTime = new Date()
        console.log(dateTime)
        res.set({
            'Content-Type': 'application/pdf; charset=utf-8',
            'Content-Disposition': `attachment; filename=ticket${dateTime.toISOString()}.pdf`,
            'Content-Length': buffer.length,
        })

        res.end(buffer);
    }
    @Get('/fullForSale')
    findFullAll_forSale() {
        return this.ticketService.findFullAll_forSale();
    }
    @Get('/find')
    findTickets(@Query() params: any) {
        return this.ticketService.findTickets(params.from, params.to, params.date);
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

    @Post('/buy/:id')
    userBoughtTicket(@Param('id') id: number, @Body() data: any) {
        console.log(id, data)
        return this.ticketService.userBoughtTicket(+id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ticketService.remove(+id);
    }
}
