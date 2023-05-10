import { ApiProperty } from "@nestjs/swagger";

export class IncompletePassenger {
    @ApiProperty({ example: 'Анненкова Светлана Ярославовна', description: 'ФИО' })
    fullname: string;
    @ApiProperty({ example: '2004-04-20', description: 'Дата рождения' })
    birth_date: string;
    @ApiProperty({ example: '8018 123456', description: 'Номер паспорта' })
    passport: string;
    @ApiProperty({example: [1, 2], description: 'Список билетов клиента'})
    ticketList: number[];
    }