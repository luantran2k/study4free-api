import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtConstants } from './auth/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
}
bootstrap();
