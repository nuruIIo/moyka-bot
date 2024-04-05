import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './entities/bot.entity';

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  controllers: [BotController],
  providers: [BotService],
})

export class BotModule {}
