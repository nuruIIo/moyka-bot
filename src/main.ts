import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
