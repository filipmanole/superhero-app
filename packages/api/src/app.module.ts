import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SuperheroModule } from "./superhero/superhero.module";
import { APP_PIPE } from "@nestjs/core";
import { HeaderMiddleware } from "./authorization.middleware";

@Module({
  imports: [SuperheroModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderMiddleware).forRoutes("*"); // Apply to all routes
  }
}
