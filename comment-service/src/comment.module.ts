import {Module} from '@nestjs/common';
import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {SequelizeModule} from "@nestjs/sequelize";
import {Comment} from "./models/comment.model";
import {User} from "./models/user.model";
import {Subcomment} from "./models/subcomment.model";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forFeature([
				Comment,
				Subcomment,
				User
			]
		),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [
				Comment,
				Subcomment,
				User
			],
			autoLoadModels: true
		})
	],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {
}
