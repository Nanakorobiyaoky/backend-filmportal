import {CountryDto} from "./country.dto";
import {GenreDto} from "./genre.dto";
import {BudgetDto} from "./budget.dto";
import {PersonCardDto} from "./person-card.dto";
import {CommentDto} from "./comment.dto";
import {FilmPersonsDto} from "./film-persons.dto";

export class FilmFullInfoDto {
	id: number
	id_kinopoisk: number
	name_ru: string
	name_en:  string
	tagline: string
	world_premier: string
	age: string
	MPAA: string
	duration_min:  number
	rating: number
	marks: number
	poster: string
	description: string
	country: CountryDto[]
	genres: GenreDto[]
	budget: BudgetDto | null
	persons: FilmPersonsDto | []

	comments: CommentDto[] | []
}