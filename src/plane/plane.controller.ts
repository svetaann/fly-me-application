
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { PlaneService } from './plane.service';
import { Plane } from './plane.entity';
import { ApiTags } from '@nestjs/swagger';


@Controller('plane')
@ApiTags('Самолет')
export class PlaneController {
    constructor(
        private readonly planeService: PlaneService) {}

    @Get()
    findAll() {
        return this.planeService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.planeService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePlane: Plane) {
        return this.planeService.update(+id, updatePlane);
    }
    @Post()
    create(@Body() createPlane: Plane) {
        return this.planeService.create(createPlane);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.planeService.remove(+id);
    }



}
