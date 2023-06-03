export class FilterDto {
	pageIndex: number
	year: number
	rating: number
	marks: number
	country: string
	actors: string
	directors: string
	genre?: string
	filmsIdAfterPersonFilter?: number[]
}