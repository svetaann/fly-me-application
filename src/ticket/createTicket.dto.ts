import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class CreateTicket {

    @ApiProperty({ example: 'Эконом', description: 'Класс комфорта' })
    class: string;
    @ApiProperty({ example: 'A', description: 'Терминал' })
    terminal: string;
    @ApiProperty({ example: '12F', description: 'Номер места' })
    seat: string;
    @ApiProperty({ example: '133', description: 'Выход на посадку' })
    gate: string;
    @ApiProperty({ example: '2023-05-22', description: 'Дата перелета' })
    date: string;
    @ApiProperty({ example: '2300', description: 'Цена' })
    price: number;
    @ApiProperty({ example: '1', description: 'Идентификатор самолета' })
    plane_id: number;
    @ApiProperty({ example: '1', description: 'Идентификатор рейса' })
    flight_id: number;

}