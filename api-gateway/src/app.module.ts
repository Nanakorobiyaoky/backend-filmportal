import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {FilmModule} from './film/film.module';
import {PersonModule} from './person/person.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";


@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		FilmModule,
		PersonModule,
		AuthModule,
		CommentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
