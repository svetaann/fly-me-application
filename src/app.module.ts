import {Module} from '@nestjs/common'
import { PlaneModule } from './plane/plane.module';
import { DatasourceModule } from './datasource/datasource.module';

@Module({
    imports: [PlaneModule, DatasourceModule],
    controllers: [],
    providers: [],
})
export class AppModule {}