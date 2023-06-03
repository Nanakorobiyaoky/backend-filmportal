import {FilmCardDto} from "./film-card.dto";

export class PersonFullInfoDto {
	id: number
	name_ru: string | null
	name_en: string | null
	birthday: string | null
	place_of_birth: string | null
	poster: string | null
	actor: FilmCardDto[] | []
	composer: FilmCardDto[] | []
	designer: FilmCardDto[] | []
	director: FilmCardDto[] | []
	editor: FilmCardDto[] | []
	operator: FilmCardDto[] | []
	producer: FilmCardDto[] | []
	translator: FilmCardDto[] | []
	voiceDirector: FilmCardDto[] | []
	voice: FilmCardDto[] | []
	writer: FilmCardDto[] | []
}