import {Controller, Get, Param} from '@nestjs/common';
import {PersonService} from "./person.service";

@Controller('/persons')
export class PersonController {
	constructor(private readonly personService: PersonService) {}

	@Get('/:id')
	getPersonById(@Param('id') id: number) {
		return this.personService.getPersonById(id)
	}
}
