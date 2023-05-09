
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Passenger } from './passenger.entity';
import { PassengerService } from './passenger.service';
import { ApiTags } from '@nestjs/swagger';



@Controller('passenger')
@ApiTags('Пассажир')
export class PassengerController {
    constructor(
        private readonly passengerService: PassengerService) {}

    @Get()
    findAll() {
        return this.passengerService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.passengerService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePassenger: Passenger) {
        return this.passengerService.update(+id, updatePassenger);
    }
    @Post()
    create(@Body() createPassenger: Passenger) {
        return this.passengerService.create(createPassenger);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.passengerService.remove(+id);
    }



}
