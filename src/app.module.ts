import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { CollectionsModule } from './collections/collections.module';
import { ExamsModule } from './exams/exams.module';
import { PartsModule } from './parts/parts.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { VocabulariesModule } from './vocabularies/vocabularies.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    ExamsModule,
    PartsModule,
    QuestionsModule,
    AnswersModule,
    CollectionsModule,
    VocabulariesModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
