
import {IsDefined, IsNumber} from "class-validator";


export class FilterDto {
	genre: string
	country: string
	rating: number
	marks: number
	actorId: number
	producerId: number
}