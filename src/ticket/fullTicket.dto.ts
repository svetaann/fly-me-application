import { ApiProperty } from "@nestjs/swagger";

export class FullTicket {
    id: number;
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
    @ApiProperty({ example: 'true', description: 'Наличие питания' })
    food: boolean;
    @ApiProperty({ example: 'true', description: 'Наличие багажа' })
    luggage: boolean;
    @ApiProperty({ example: '2300', description: 'Цена' })
    price: number;
    @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО пассажира' })
    passengerName: string;
    @ApiProperty({ example: 'Boeing 455', description: 'Самолет' })
    plane: string;
    @ApiProperty({ example: 'GH987', description: 'Рейс' })
    flight: string;
    @ApiProperty({ example: '11:50', description: 'Время вылета' })
    startTime: string;
    @ApiProperty({ example: '16:33', description: 'Время прилета' })
    endTime: string;
    @ApiProperty({ example: 'Шереметьево', description: 'Название аэропорта отправления' })
    from_airport: string;
    @ApiProperty({ example: 'Внуково', description: 'Название аэропорта прибытия' })
    to_airport: string;
    @ApiProperty({ example: 'SVO', description: 'ИАТА код аэропорта отправления' })
    from_iata: string;
    @ApiProperty({ example: 'VKO', description: 'ИАТА код аэропорта прибытия' })
    to_iata: string;
    @ApiProperty({ example: 'Москва', description: 'Город отправления' })
    from_city: string;
    @ApiProperty({ example: 'Уфа', description: 'Город прибытия' })
    to_city: string;
}
