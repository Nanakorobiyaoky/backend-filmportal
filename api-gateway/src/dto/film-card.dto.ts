import {CountryDto} from "./country.dto";
import {GenreDto} from "./genre.dto";

export class FilmCardDto {
	id: number
	name_ru: string
	name_en: string
	poster: string
	rating: number
	world_premier: string
	country: CountryDto[]
	genres: GenreDto[]
}