import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { Admin } from './bot/entities/admin.entity';
import { Car } from './bot/entities/cars.entity';
import { Service } from './bot/entities/services.entity';
import { User } from './bot/entities/users.entity';
import { Worker } from './bot/entities/workers.entity';
// import { Bot } from './bot/entities/bot.entity';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true, // Automatically load models from the models directory
      synchronize: true, // Automatically synchronize models with the database (for development only)
      models: [Admin, Car, Service, User, Worker], // Array of model classes
    }),
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
