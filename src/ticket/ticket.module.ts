import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({

controllers: [TicketController],

providers: [TicketService],

imports: [DatasourceModule]

})

export class TicketModule {}