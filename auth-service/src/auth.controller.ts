import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {LoginPasswordRoleDto} from "./dto/login-password-role.dto";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@MessagePattern({cmd: "login user"})
	loginUser(@Payload() loginPasswordDto: LoginPasswordRoleDto) {
		return this.authService.loginUser(loginPasswordDto);
	}

	@MessagePattern({cmd: "register user"})
	registerUser(@Payload() loginPasswordDto: LoginPasswordRoleDto) {
		console.log(loginPasswordDto)
		return this.authService.registerUser(loginPasswordDto);
	}

}
