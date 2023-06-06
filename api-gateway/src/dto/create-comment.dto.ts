import {IsDefined, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateCommentDto  {
	@IsNumber()
	@IsOptional()
	filmId: number

	@IsDefined()
	@IsNumber()
	userId: number

	@IsDefined()
	@IsString()
	userLogin: string

	@IsDefined()
	@IsString()
	text: string

}