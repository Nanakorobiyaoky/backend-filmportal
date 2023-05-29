import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import * as process from "process";
import {User} from "./model/users.model";

@Module({
	imports: [

		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forFeature([User]),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [User],
			autoLoadModels: true,
			synchronize: true
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {
}
