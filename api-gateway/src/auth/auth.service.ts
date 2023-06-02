import {HttpException, HttpStatus, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginPasswordDto} from "../dto/login-password.dto";
import {ClientProxy} from "@nestjs/microservices";
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {UserDto} from "../dto/user.dto";
import {UserInfoTokenDto} from "../dto/user-info-token.dto";

@Injectable()
export class AuthService {

	constructor(@Inject("AUTH_SERVICE") private readonly authClient: ClientProxy,
							private readonly jwtService: JwtService) {}
	async registerUser(loginPasswordDto: LoginPasswordDto): Promise<UserInfoTokenDto> {
		const user = await firstValueFrom(this.authClient.send({ cmd: "register user" }, loginPasswordDto)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)

		return await this.createResponseData(user)
	}

	async loginUser(loginPasswordDto: LoginPasswordDto): Promise<UserInfoTokenDto> {
		const user = await firstValueFrom(this.authClient.send({ cmd: "login user" }, loginPasswordDto)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new UnauthorizedException(error.message));
				})
			)
		)

		return await this.createResponseData(user)
	}

	private async generateToken(user: UserDto): Promise<string> {
		return this.jwtService.sign(user)
	}

	private async createResponseData(user: UserDto): Promise<UserInfoTokenDto> {
		return {
			id: user.id,
			login: user.login,
			role: user.role,
			createdAt: user.createdAt,
			token: await this.generateToken(user)
		}
	}

}
