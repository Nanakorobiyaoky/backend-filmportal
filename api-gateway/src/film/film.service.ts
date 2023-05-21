import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";
import {PersonService} from "../person/person.service";

@Injectable()
export class FilmService {
	constructor(@Inject("FILM_SERVICE") private readonly filmClient: ClientProxy,
							private readonly personService: PersonService) {
	}

	async getFilmById(id: number) {
		const filmData = await firstValueFrom(this.filmClient.send({ cmd: "get film by id" }, id)
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

		return filmData
	}

	async getFilmsByGenre(genre: string) {
		const response = await firstValueFrom(this.filmClient.send({ cmd: "get films by genre" }, genre)
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
}
