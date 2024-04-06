import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { Car } from './entities/cars.entity';
import { Service } from './entities/services.entity';
import { User } from './entities/users.entity';
import { Worker } from './entities/workers.entity';
// import { Bot } from './entities/bot.entity';

@Module({
  imports: [SequelizeModule.forFeature([Admin, Car, Service, User, Worker])],
  providers: [BotService, BotUpdate],
  exports: [BotService]
})
export class BotModule {}
