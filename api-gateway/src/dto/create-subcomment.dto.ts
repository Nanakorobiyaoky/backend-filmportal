import {IsDefined, IsNumber, IsString} from "class-validator";

export class CreateSubcommentDto  {
	@IsNumber()
	@IsDefined()
	commentId: number
	@IsNumber()
	@IsDefined()
	userId: number
	@IsString()
	@IsDefined()
	userLogin: string
	@IsString()
	@IsDefined()
	text: string

}