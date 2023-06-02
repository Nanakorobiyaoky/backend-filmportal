import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {FilmService} from "./film.service";
import {CreateCommentDto} from "../dto/create-comment.dto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {CreateSubcommentDto} from "../dto/create-subcomment.dto";


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


  @UseGuards(JwtAuthGuard)
  @Post('film/:id')
  createComment(@Body() createCommentDto: CreateCommentDto, @Param('id') id: number): void {
    this.filmService.createComment(createCommentDto, id)
  }

  @UseGuards(JwtAuthGuard)
  @Put('film/:id')
  createSubcomment(@Body() createSubcommentDto: CreateSubcommentDto): void {
    this.filmService.createSubcomment(createSubcommentDto)
  }
  // @Get('movies')
  // getMoviesData() {
  //   // return this.filmService.getMoviesData()
  // }
  //
  // @Post('movies')
  // a(@Body() body) {
  //   // return this.filmService.getFilmsByFilters(filterDto)
  // }

}

