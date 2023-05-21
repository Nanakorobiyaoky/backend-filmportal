import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";

@Injectable()
export class PersonService {

	constructor(@Inject("PERSON_SERVICE") private readonly personClient: ClientProxy) {
	}

	async getPersonById(id: number) {
		const response = await this.personClient.send({cmd: "get person by id"}, id)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)

		return response
	}

	async getPersonsByFilmId(id: number) {
		const persons = await firstValueFrom(this.personClient.send({cmd: "get persons by film id"}, id)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)

		return persons
	}
}
