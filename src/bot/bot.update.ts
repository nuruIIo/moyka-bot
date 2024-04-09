import { BotService } from './bot.service';
import { Action, Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    this.botService.start(ctx);
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    this.botService.onContact(ctx);
  }

  // @Command('addadmin')
  // async addAdmin(@Ctx() ctx: Context) {
  //   this.botService.addAdmin(ctx)
  // }

  @Command('addWorker')
  async addWorker(@Ctx() ctx: Context) {
    this.botService.addWorker(ctx);
  }

  @Command('deleteWorker')
  async deleteWorker(@Ctx() ctx: Context) {
    this.botService.deleteWorker(ctx);
  }

  @Command('getWorkers')
  async getWorkers(@Ctx() ctx: Context) {
    this.botService.getWorkers(ctx);
  }

  @Command('stop')
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  @Command('help')
  async onHelp(@Ctx() ctx: Context) {
    await this.botService.onHelp(ctx);
  }

  @Command('addcar')
  async addCar(@Ctx() ctx: Context) {
    await this.botService.addCar(ctx);
  }

  @Action('cars')
  async onActionCars(@Ctx() ctx: Context) {
    await this.botService.onActionCars(ctx);
  }

  @Action('addcar')
  async onActionAddCar(@Ctx() ctx: Context) {
    await this.botService.onActionAddCar(ctx);
  }
}
