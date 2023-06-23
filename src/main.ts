import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtConstants } from './auth/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Study4free')
    .setVersion('1.0')
    .addTag('exams')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
}
bootstrap();
