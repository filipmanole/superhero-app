// import { NestFactory } from "@nestjs/core";
// import { ValidationPipe } from "@nestjs/common";
// import serverlessExpress from "@codegenie/serverless-express";
// import { Callback, Context, Handler } from "aws-lambda";
// import { AppModule } from "./app.module";

// let server: Handler;

// async function bootstrap(): Promise<Handler> {
//   const app = await NestFactory.create(AppModule);

//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       forbidUnknownValues: true,
//     })
//   );

//   await app.init();

//   const expressApp = app.getHttpAdapter().getInstance();
//   return serverlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback
// ) => {
//   server = server ?? (await bootstrap());
//   return server(event, context, callback);
// };

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
