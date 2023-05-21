import { Controller, Get, Param } from "@nestjs/common";
import {FilmService} from "./film.service";

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get('film/:id')
  getFilmById(@Param('id') id: number) {
    return this.filmService.getFilmById(id)
  }

  @Get('movies/:genre')
  getFilmsByGenre(@Param('genre') genre: string) {
    return this.filmService.getFilmsByGenre(genre)
  }


}

