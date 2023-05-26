import {Body, Controller, Get, Param, Post} from "@nestjs/common";
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

  @Get('movies')
  getMoviesData() {
    // return this.filmService.getMoviesData()
  }

  @Post('movies')
  a(@Body() body) {
    // return this.filmService.getFilmsByFilters(filterDto)
  }

}

