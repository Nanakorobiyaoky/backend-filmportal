import {Controller, Get} from '@nestjs/common';
import {FilmService} from "./film/film.service";

@Controller()
export class AppController {

	constructor(
		private readonly filmService: FilmService
	) {}

	@Get()
	getMainPageData() {
		return this.filmService.getMainPageData(['drama', 'comedy'])
	}

}
