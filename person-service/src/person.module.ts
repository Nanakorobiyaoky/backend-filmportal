import {Module} from '@nestjs/common';
import {PersonController} from './person.controller';
import {PersonService} from './person.service';
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Person} from "./models/persons.model";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forFeature([Person]),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [Person],
			autoLoadModels: true
		})
	],
	controllers: [PersonController],
	providers: [PersonService],
})
export class PersonModule {
}
