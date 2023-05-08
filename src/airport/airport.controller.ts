
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Airport } from './airport.entity';
import { AirportService } from './airport.service';



@Controller('airport')
export class AirportController {
    constructor(
        private readonly airportService: AirportService) {}

    @Get()
    findAll() {
        return this.airportService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.airportService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateAirport: Airport) {
        return this.airportService.update(+id, updateAirport);
    }
    @Post()
    create(@Body() createAirport: Airport) {
        return this.airportService.create(createAirport);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.airportService.remove(+id);
    }



}
