import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  @Inject(AppService)
  private readonly appService: AppService;

  @Get("/status")
  status(): string {
    return this.appService.status();
  }
}
