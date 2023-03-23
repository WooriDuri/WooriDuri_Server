import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './chats/adapter';
import { HttpExceptionFilter } from './exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      //     whitelist: true, //decorator 없는 property object 거름
      //     forbidNonWhitelisted: true, //이상한 값 요청오면 요청 막음 보안상승
      transform: true, //id값 url로 보내면 string인데 이걸 원하는걸로 변환시켜주는옵션
      //     // transformOptions: {
      //     //   enableImplicitConversion: true,
      // },
    }),
  );
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Wooriduri')
    .setDescription('Wooriduri API description')
    .setVersion('1.0.0')
    .addTag('wooriduri')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3000);
}
bootstrap();
