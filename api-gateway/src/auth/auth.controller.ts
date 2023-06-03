import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {ValidationPipe} from "../pipes/validation.pipe";
import {AuthService} from "./auth.service";
import {LoginPasswordDto} from "../dto/login-password.dto";
import {UserInfoTokenDto} from "../dto/user-info-token.dto";


@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@UsePipes(ValidationPipe)
	@Post('/registration')
	registerUser(@Body() loginPasswordDto: LoginPasswordDto): Promise<UserInfoTokenDto> {
		return this.authService.registerUser(loginPasswordDto);
	}

	@Post('/login')
	loginUser(@Body() loginPasswordDto: LoginPasswordDto): Promise<UserInfoTokenDto> {
		return this.authService.loginUser(loginPasswordDto);
	}
}
