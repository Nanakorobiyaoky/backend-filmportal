import {Controller} from '@nestjs/common';
import {FilmService} from './film.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {FilterDto} from "./dto/filter.dto";

@Controller()
export class FilmController {
	constructor(private readonly filmService: FilmService) {
	}

	@MessagePattern({cmd: 'get film by id'})
	getFilmById(@Payload() id: number) {
		return this.filmService.getFilmById(id)
	}

	@MessagePattern({cmd: 'get films by genre'})
	getFilmsByGenre(@Payload() genre: string) {
		return this.filmService.getFilmsByGenre(genre)
	}

	@MessagePattern({ cmd: "get films by person id" })
	getFilmsByPersonId(@Payload() data) {
		return this.filmService.getFilmsByPersonId(data)
	}

	@MessagePattern({ cmd: "get main page data" })
	getMainPageData(@Payload() genreNames: Array<string>) {
		return this.filmService.getMainPageData(genreNames, 10)
	}

	@MessagePattern({cmd: "get films by filters"})
	getMoviesByFilter(@Payload() filter: FilterDto) {
		return this.filmService.getFilmsByFilter(filter)
	}

}
