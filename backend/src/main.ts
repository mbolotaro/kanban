import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  const config = new DocumentBuilder()
  .setTitle('KANBAN Api')
  .setVersion('0.0.1')
  .setDescription('All the response schemas also have the parameters: <code>id: number</code>, <code>created_at: string </code> and <code>updated_at: string</code>')
  .setContact('Mateus Bolotaro', 'https://github.com/mbolotaro/', 'mbolotaro@gmail.com')
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();