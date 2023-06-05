import {IsDefined, IsNumber, IsOptional, IsPositive, IsString, Min, min} from "class-validator";


export class FilterDto {

	@IsNumber()
	@IsDefined()
	pageIndex: number

	@IsNumber()
	@IsDefined()
	year: number

	@IsNumber()
	@IsDefined()
	rating: number

	@IsNumber()
	@IsDefined()
	marks: number

	@IsString()
	@IsDefined()
	country: string

	@IsString()
	@IsDefined()
	actors: string

	@IsString()
	@IsDefined()
	directors: string

	@IsString()
	@IsOptional()
	genre?: string

	@IsOptional()
	filmsIdAfterPersonFilter?: number[]
}