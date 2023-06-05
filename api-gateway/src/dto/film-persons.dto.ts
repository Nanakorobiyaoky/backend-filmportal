import {PersonCardDto} from "./person-card.dto";

export class FilmPersonsDto {
	actors: PersonCardDto[] | []
	composers: PersonCardDto[] | []
	designers: PersonCardDto[] | []
	directors: PersonCardDto[] | []
	editors: PersonCardDto[] | []
	operators: PersonCardDto[] | []
	producers: PersonCardDto[] | []
	translators: PersonCardDto[] | []
	voiceDirectors: PersonCardDto[] | []
	voices: PersonCardDto[] | []
	writers: PersonCardDto[] | []
}