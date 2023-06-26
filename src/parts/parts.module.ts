import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartsModule {}
