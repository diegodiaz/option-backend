import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '3000');
  // we limit requests to 20 per minute
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
  });
  app.use(limiter);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port).then(() => {
    console.log(`App listening at port: ${port}`);
  });
}
bootstrap();
