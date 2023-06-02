import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";
import {PersonService} from "../person/person.service";
import {CommentService} from "../comment/comment.service";
import {CreateCommentDto} from "../dto/create-comment.dto";
import {CreateSubcommentDto} from "../dto/create-subcomment.dto";

@Injectable()
export class FilmService {
	constructor(@Inject("FILM_SERVICE") private readonly filmClient: ClientProxy,
							@Inject(forwardRef(() => PersonService)) private readonly personService: PersonService,
							@Inject(CommentService) private readonly commentService: CommentService) {
	}

	async getFilmById(id: number) {
		const filmData = await firstValueFrom(this.filmClient.send({cmd: "get film by id"}, id)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)
		filmData['persons'] = await this.personService.getPersonsByFilmId(id)
		filmData['comments'] = await this.commentService.getCommentsByFilmId(id)

		return filmData
	}

	async getFilmsByGenre(genre: string) {
		const response = await firstValueFrom(this.filmClient.send({cmd: "get films by genre"}, genre)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)

		return response
	}

	async getFilmsByPersonId(id: number) {
		const response = await firstValueFrom(this.filmClient.send({cmd: "get films by person id"}, id)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)

		return response
	}

	async getMainPageData(genresIdArr) {
		const response = await firstValueFrom(this.filmClient.send({cmd: "get main page data"}, genresIdArr)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)

		return response
	}

	async createComment(createCommentDto: CreateCommentDto, id: number) {
		createCommentDto.filmId = id
		await this.commentService.createComment(createCommentDto)
	}

	async createSubcomment(createSubcommentDto: CreateSubcommentDto) {
		await this.commentService.createSubcomment(createSubcommentDto)
	}
}
