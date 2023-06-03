import {Controller, Get} from '@nestjs/common';
import {FilmService} from "./film/film.service";
import {MainPageDataDto} from "./dto/main-page-data.dto";

@Controller()
export class AppController {

	constructor(
		private readonly filmService: FilmService
	) {}

	@Get()
	getMainPageData(): Promise<MainPageDataDto> {
		return this.filmService.getMainPageData(['drama', 'comedy'])
	}

}
