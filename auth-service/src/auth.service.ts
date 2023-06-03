import {HttpStatus, Injectable} from '@nestjs/common';
import {LoginPasswordRoleDto} from "./dto/login-password-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./model/users.model";
import {RpcException} from "@nestjs/microservices";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

	constructor(@InjectModel(User) private readonly userRepository: typeof User) {
	}

	async loginUser(loginPasswordRoleDto: LoginPasswordRoleDto): Promise<User> {

		const login = loginPasswordRoleDto.login
		const password = loginPasswordRoleDto.password

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

	async registerUser(loginPasswordRoleDto: LoginPasswordRoleDto): Promise<User> {

		try {

			const login = loginPasswordRoleDto.login
			const role = loginPasswordRoleDto.role
			const password = await bcrypt.hash(loginPasswordRoleDto.password, 5);


			const newUser = await this.userRepository.create({
				login: login,
				password: password,
				role: role ? role : 'user'
			})

			return newUser

		} catch (e) {
			throw new RpcException({
				message: 'User with this login already exists',
				status: HttpStatus.BAD_REQUEST
			})
		}

	}
}
