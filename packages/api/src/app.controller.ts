import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  @Inject(AppService)
  private readonly appService: AppService;

  @Get("/hello")
  getHello(): string {
    console.log("Hello World!");
    return this.appService.getHello();
  }
}
