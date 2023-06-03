import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {FilmService} from "./film.service";
import {CreateCommentDto} from "../dto/create-comment.dto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {CreateSubcommentDto} from "../dto/create-subcomment.dto";
import {FilmFullInfoDto} from "../dto/film-full-info.dto";
import {FilterDto} from "../dto/filter.dto";



@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get('film/:id')
  getFilmById(@Param('id') id: number): Promise<FilmFullInfoDto> {
    return this.filmService.getFilmById(id)
  }

  @Get('movies')
  getFilmsNoFilter() {
    return this.filmService.getFilmsNoFilter()
  }

  @Post('movies')
  getFilmsByFilter(@Body() filterDto: FilterDto) {
    return this.filmService.getFilmsByFilter(filterDto)
  }

  @Post('movies/:genre')
  getFilmsByFilterAndGenre(@Body() filterDto: FilterDto, @Param('genre') genre: string) {
    return this.filmService.getFilmsByFilterAndGenre(filterDto, genre)
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

}

