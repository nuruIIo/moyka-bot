import { BotService } from './bot.service';
import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  // @Start()
  // async onStart(@Ctx() ctx: Context) {
  //   this.botService.start(ctx);
  // }

  // @On('contact')
  // async onContact(@Ctx() ctx: Context) {
  //   this.botService.onContact(ctx);
  // }

  // @Command('addadmin')
  // async addAdmin(@Ctx() ctx: Context) {
  //   this.botService.addAdmin(ctx)
  // }

  @Command('addworker')
  async addWorker(@Ctx() ctx: Context) {
    this.botService.addWorker(ctx)
  }
}
