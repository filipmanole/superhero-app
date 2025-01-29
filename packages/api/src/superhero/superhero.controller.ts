import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { SuperheroService } from "./superhero.service";
import { CreateSuperheroDto, ListSuperheroesDto } from "./superhero.dto";

@Controller("superheroes")
export class SuperheroController {
  @Inject(SuperheroService)
  private readonly superheroService: SuperheroService;

  @Post()
  create(@Body() params: CreateSuperheroDto) {
    return "OKKKKKKKK";
    return this.superheroService.create(params);
  }

  @Get()
  list(@Query() params: ListSuperheroesDto) {
    return this.superheroService.list(params);
  }
}
