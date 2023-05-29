import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {LoginPasswordDto} from "./dto/login-password.dto";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@MessagePattern({cmd: "login user"})
	loginUser(@Payload() loginPasswordDto: LoginPasswordDto) {
		return this.authService.loginUser(loginPasswordDto);
	}

	@MessagePattern({cmd: "register user"})
	registerUser(@Payload() loginPasswordDto: LoginPasswordDto) {
		return this.authService.registerUser(loginPasswordDto);
	}

}
