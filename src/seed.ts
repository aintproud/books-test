import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed.service';

NestFactory.createApplicationContext(AppModule).then(async (app) => {
  const seedService = app.get(SeedService);
  await seedService.seed();
  await app.close();
});
