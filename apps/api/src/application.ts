import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module.js';
import { correlationMiddleware } from './correlation.middleware.js';
import { SafeErrorFilter } from './safe-error.filter.js';

export async function createApplication(): Promise<INestApplication> {
  const application = await NestFactory.create(AppModule, {
    logger: false,
  });

  application.use(correlationMiddleware);
  application.useGlobalFilters(new SafeErrorFilter());

  const document = SwaggerModule.createDocument(
    application,
    new DocumentBuilder().setTitle('FlowPilot API').setVersion('1.0').build(),
  );
  SwaggerModule.setup('docs', application, document);

  await application.init();
  return application;
}
