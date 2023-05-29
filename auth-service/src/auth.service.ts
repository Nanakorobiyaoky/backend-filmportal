import {HttpStatus, Injectable} from '@nestjs/common';
import {LoginPasswordDto} from "./dto/login-password.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./model/users.model";
import {RpcException} from "@nestjs/microservices";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

	constructor(@InjectModel(User) private readonly userRepository: typeof User) {
	}

	async loginUser(loginPasswordDto: LoginPasswordDto) {

		const login = loginPasswordDto.login
		const password = loginPasswordDto.password

		const user = await this.userRepository.findOne({
			where: {
				login: login
			}
		});

		if (!user) {
			throw new RpcException({
				message: 'User with this login does not exist'
			})
		}

		const passwordsEquals = await bcrypt.compare(password, user.password)
		if (passwordsEquals) return user

		throw new RpcException({
			message: 'Incorrect password'
		})

	}

	async registerUser(loginPasswordDto: LoginPasswordDto) {

		try {
			const login = loginPasswordDto.login
			const password = await bcrypt.hash(loginPasswordDto.password, 5);

			const newUser = await this.userRepository.create({
				login: login,
				password: password
			})

			return newUser

		} catch {
			throw new RpcException({
				message: 'User with this login already exists',
				status: HttpStatus.BAD_REQUEST
			})
		}

	}
}
