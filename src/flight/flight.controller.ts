
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Flight } from './flight.entity';
import { FlightService } from './flight.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('flight')
@ApiTags('Рейс')
export class FlightController {
    constructor(private readonly flightService: FlightService) { }

    @Get()
    findAll() {
        return this.flightService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateFlight: Flight) {
        return this.flightService.update(+id, updateFlight);
    }

    @Post()
    create(@Body() createFlight: Flight) {
        return this.flightService.create(createFlight);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.flightService.remove(+id);
    }
}
