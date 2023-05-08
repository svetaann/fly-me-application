import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Education API')
        .setVersion('1.0')
        .build(); 
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api_docs', app, document); 
    await app.listen(3001);
    await app.setGlobalPrefix('/api'); 
    
}
bootstrap();