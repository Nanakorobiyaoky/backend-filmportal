import {IsDefined, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";

export class LoginPasswordRoleDto {

	@Transform(({value}: TransformFnParams) => value.trim())
	@IsEmail()
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	login: string

	@Transform(({value}: TransformFnParams) => value.trim())
	@Length(4, 255, {message: 'Password must be longer than 4 characters'})
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	password: string

	@IsIn(['user', 'admin'])
	@IsString()
	@IsOptional()
	role: string

}