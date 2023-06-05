import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";
import {PersonService} from "../person/person.service";
import {CommentService} from "../comment/comment.service";
import {CreateCommentDto} from "../dto/create-comment.dto";
import {CreateSubcommentDto} from "../dto/create-subcomment.dto";
import {MainPageDataDto} from "../dto/main-page-data.dto";
import {FilmFullInfoDto} from "../dto/film-full-info.dto";
import {FilterDto} from "../dto/filter.dto";
import {DirectorActorNamePartDto} from "../dto/director-actor-name-part.dto";

@Injectable()
export class FilmService {
	constructor(@Inject("FILM_SERVICE") private readonly filmClient: ClientProxy,
							@Inject(forwardRef(() => PersonService)) private readonly personService: PersonService,
							@Inject(CommentService) private readonly commentService: CommentService) {}

	async getFilmById(id: number): Promise<FilmFullInfoDto> {
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

		let persons;
		let comments;

		try {
			persons = await this.personService.getPersonsByFilmId(id);
		} catch (e) {
			console.log(e.message);
		}

		try {
			comments = await this.commentService.getCommentsByFilmId(id);
		} catch (e) {
			console.log(e.message);
		}

		filmData['persons'] = persons ? persons : []
		filmData['comments'] = comments ? comments : []

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

	async getMainPageData(genresArr): Promise<MainPageDataDto> {
		const response = await firstValueFrom(this.filmClient.send({cmd: "get main page data"}, genresArr)
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

	createComment(createCommentDto: CreateCommentDto, id: number): void {
		createCommentDto.filmId = id
		this.commentService.createComment(createCommentDto)
	}

	createSubcomment(createSubcommentDto: CreateSubcommentDto): void {
		this.commentService.createSubcomment(createSubcommentDto)
	}

	async getFilmsNoFilter() {
		const noFilter: FilterDto = {
			pageIndex: 0,
			year: 0,
			rating: 0,
			marks: 0,
			country: '',
			actors: '',
			directors: '',
		}

		return await this.getFilmsByFilter(noFilter)
	}

	async getFilmsByFilter(filter: FilterDto) {

		let filmsIdAfterPersonFilter = [];

		if (filter.actors || filter.directors) {
			const namesPart: DirectorActorNamePartDto = {
				directorNamePart: filter.directors,
				actorNamePart: filter.actors
			}

			filmsIdAfterPersonFilter = await this.personService.findPersonsByName(namesPart)
		}

		filter.filmsIdAfterPersonFilter = filmsIdAfterPersonFilter


		const filmsByFilter = await firstValueFrom(this.filmClient.send({cmd: "get films by filters"}, filter)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				})
			)
		)

		return filmsByFilter
	}

	async getFilmsByFilterAndGenre(filterDto: FilterDto, genre: string) {
		filterDto.genre = genre
		return await this.getFilmsByFilter(filterDto)
	}

	async getAllGenres() {
		const genres = await firstValueFrom(this.filmClient.send({cmd: "get all genres"}, {})
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			))

		return genres
	}

	async getAllCountries() {
		const genres = await firstValueFrom(this.filmClient.send({cmd: "get all countries"}, {})
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			))

		return genres
	}
}
