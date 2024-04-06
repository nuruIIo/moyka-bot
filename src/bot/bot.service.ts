import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { Bot } from './entities/bot.entity';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { Context, Markup, Telegraf } from 'telegraf';
import { Admin } from './entities/admin.entity';
import { Car } from './entities/cars.entity';
import { Service } from './entities/services.entity';
import { User } from './entities/users.entity';
import { Worker } from './entities/workers.entity';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    @InjectModel(Car) private carRepo: typeof Car,
    @InjectModel(Service) private serviceRepo: typeof Service,
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Worker) private workerRepo: typeof Worker,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async addAdmin(ctx: Context) {
    await this.adminRepo.create({
      admin_id: ctx.from.id,
      username: ctx.from.username,
      first_name: ctx.from.first_name,
      last_name: ctx.from.last_name,
      status: true,
    });

    await ctx.reply(`Please, send your phone number`, {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        [Markup.button.contactRequest('sending phone number')],
      ])
        .resize()
        .oneTime(),
    });
  }

  async addWorker(ctx: Context) {
    let username: string | undefined;
    let phone: string | undefined;

    if ('text' in ctx.message && ctx.message.text) {
      const parts = ctx.message.text.split(' ');
      if (
        parts.length >= 5 &&
        parts[1] === 'username:' &&
        parts[3] === 'phone:'
      ) {
        username = parts[2];
        phone = parts[4];
        if (phone.length != 13) {
          return ctx.reply(
            'Invalid phone! Please, send workers username (eshmat) and phone (+998902000101)',
          );
        }
      } else {
        return ctx.reply(
          'Invalid format! Please, send workers username (eshmat) and phone (+998902000101)',
        );
      }
    } else {
      return ctx.reply(
        'Invalid format! Please, send workers username (eshmat) and phone (+998902000101)',
      );
    }

    // console.log('Username:', username);
    // console.log('Phone:', phone);

    return ctx.reply(
      'Great',
    );
  }

  // async start(ctx: Context) {
  //   const userId = ctx.from.id;
  //   const user = await this.botRepo.findByPk(userId);
  //   if (!user) {
  //     await this.botRepo.create({
  //       user_id: userId,
  //       username: ctx.from.username,
  //       first_name: ctx.from.first_name,
  //       last_name: ctx.from.last_name,
  //     });

  //     await ctx.reply(`Please, send your phone number`, {
  //       parse_mode: 'HTML',
  //       ...Markup.keyboard([
  //         [Markup.button.contactRequest('sending phone number')],
  //       ])
  //         .resize()
  //         .oneTime(),
  //     });
  //   } else if (!user.status) {
  //     await ctx.reply(`Please, send your phone number`, {
  //       parse_mode: 'HTML',
  //       ...Markup.keyboard([
  //         [Markup.button.contactRequest('sending phone number')],
  //       ])
  //         .resize()
  //         .oneTime(),
  //     });
  //   } else {
  //     await ctx.reply(`this bot does completely nothing at all`, {
  //       parse_mode: 'HTML',
  //       ...Markup.removeKeyboard(),
  //     });
  //   }
  // }

  // async onContact(ctx: Context) {
  //   if ('contact' in ctx.message) {
  //     const userId = ctx.from.id;
  //     const user = await this.botRepo.findByPk(userId);
  //     if (!user) {
  //       await ctx.reply(`please, send /start command`, {
  //         parse_mode: 'HTML',
  //         ...Markup.keyboard([['/start']])
  //           .resize()
  //           .oneTime(),
  //       });
  //     } else if (ctx.message.contact.user_id != userId) {
  //       await ctx.reply(`please, send your own phone number`, {
  //         parse_mode: 'HTML',
  //         ...Markup.keyboard([
  //           [Markup.button.contactRequest('sending phone number')],
  //         ])
  //           .resize()
  //           .oneTime(),
  //       });
  //     } else {
  //       await this.botRepo.update(
  //         {
  //           phone_number: ctx.message.contact.phone_number,
  //           status: true,
  //         },
  //         { where: { user_id: userId } },
  //       );
  //       await ctx.reply(`congrats`, {
  //         parse_mode: 'HTML',
  //         ...Markup.removeKeyboard(),
  //       });
  //     }
  //   }
  // }
}
