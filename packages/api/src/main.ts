import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@codegenie/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import { AppModule } from "./app.module";

let server: Handler;

import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from "@nestjs/common";

@Injectable()
export class LoggingValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(`🚀 Running validation on:`, value);
    return super.transform(value, metadata);
  }
}

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Removes unknown fields
      forbidNonWhitelisted: true, // Rejects unknown fields
    })
  );

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
