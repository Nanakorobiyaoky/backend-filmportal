import {Controller} from '@nestjs/common';
import {FilmService} from './film.service';
import {MessagePattern, Payload} from "@nestjs/microservices";

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
}
