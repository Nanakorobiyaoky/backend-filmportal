import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "./models/films.model";
import {Genre} from "./models/genres.model";
import {Country} from "./models/countries.model";
import {FilmBudget} from "./models/films-budget.model";
import {RpcException} from "@nestjs/microservices";
import {FilmCardDto} from "./dto/film-card.dto";
import {FilterDto} from "./dto/filter.dto";
import {Op} from "sequelize";

@Injectable()
export class FilmService {
	constructor(@InjectModel(Film) private readonly filmsRepository: typeof Film,
							@InjectModel(Genre) private readonly genreRepository: typeof Genre,
							@InjectModel(Country) private readonly countryRepository: typeof Country,
							@InjectModel(FilmBudget) private readonly filmBudgetRepository: typeof FilmBudget,
	) {
	}

	async getFilmById(id: number): Promise<Film> {

		const film = await this.filmsRepository.findByPk(id, {
			include: [
				{
					model: this.countryRepository,
					through: {attributes: []},
				},
				{
					model: this.genreRepository,
					through: {attributes: []},
				},
				{
					model: this.filmBudgetRepository,
					attributes: {
						exclude: ['film_id']
					}
				}
			],
		})

		if (!film) {
			this.notFoundException()
		}

		return film
	}

	async getFilmsByGenre(genre: string) {

		const films = await this.genreRepository.findOne({
			where: {
				name_en: genre
			},
			include: {
				model: this.filmsRepository,
				attributes: ['id', 'name_ru', 'name_en', 'rating', 'poster', 'world_premier'],
				through: {attributes: []},
				include: [
					{
						model: this.genreRepository,
						through: {attributes: []},
					}
				]
			}
		})

		if (!films) {
			this.notFoundException()
		}

		return films

	}

	async getFilmsByPersonId(data): Promise<FilmCardDto[]> {
		for (let key in data) {
			let filmIdArray = data[key]

			if (!Array.isArray(filmIdArray) || filmIdArray.length === 0) {
				continue
			}

			data[key] = await this.filmsRepository.findAll({
				where: {
					id: filmIdArray.map((obj) => obj.film_id)
				},
				attributes: ['id', 'name_ru', 'name_en', 'poster', 'rating', 'world_premier'],
				include: [
					{
						model: this.genreRepository,
						through: {attributes: []},
					},
					{
						model: this.countryRepository,
						through: {attributes: []},
					}
				]
			})
		}

		return data
	}

	async getMainPageData(genresNames: Array<string>, limit: number) {

		const result = {}

		for (let name of genresNames) {
			const genreFilms = await this.getFilmsByGenreWithLimit(name, limit)
			result[name] = genreFilms
		}

		const mostRating = await this.getMostRatingFilmsWithLimit(limit)

		result['rating'] = mostRating

		return result
	}

	private async getFilmsByGenreWithLimit(name_en: string, limit: number) {

		const films = await this.filmsRepository.findAll({
			limit: limit,
			order: [['world_premier', 'DESC']],
			attributes: ['id', 'name_ru', 'name_en', 'poster', 'rating', 'world_premier'],
			include: [
				{
					model: this.countryRepository,
					through: {attributes: []},
				},
				{
					model: this.genreRepository,
					through: {attributes: []},
					where: {
						name_en: name_en
					}
				}
			],
		})

		return films
	}

	private async getMostRatingFilmsWithLimit(limit: number) {
		const films = await this.filmsRepository.findAll({
			attributes: ['id', 'name_ru', 'name_en', 'poster', 'rating', 'world_premier'],
			limit: limit,
			include: [
				{
					model: this.countryRepository,
					through: {attributes: []},
				},
				{
					model: this.genreRepository,
					through: {attributes: []},
				}
			],
			order: [['rating', 'DESC']]
		})

		return films
	}

	async getFilmsByFilter(filter: FilterDto) {

		if (filter.filmsIdAfterPersonFilter.length > 0) {
			const result = await this.filmsRepository.findAll({
				offset: filter.pageIndex * 15,
				order: [['rating', 'DESC']],
				limit: 15,
				attributes: ['id', 'name_ru', 'name_en', 'poster', 'rating', 'world_premier'],
				include: [
					{
						model: this.genreRepository,
						through: {attributes: []},
						where: {
							name_en: {
								[Op.iLike]: `%${filter.genre ? filter.genre : ''}%`
							}
						}
					},
					{
						model: this.countryRepository,
						through: {attributes: []},
						where: {
							name: {
								[Op.iLike]: `%${filter.country}%`,
							}
						},
					},
				],
				where: {
					id: {
						[Op.in]: filter.filmsIdAfterPersonFilter,
					},
					rating: {
						[Op.gte]: filter.rating
					},
					marks: {
						[Op.gte]: filter.marks
					},
					world_premier: {
						[Op.between]: [
							this.createStartDateOfYear(filter.year <= 5 ? 5 : filter.year),
							this.createEndDateOfYear(filter.year <= 5 ? 5 : filter.year)
						]
					},
				},
			})
			return result
		}

		const result = await this.filmsRepository.findAll({
			offset: filter.pageIndex * 15,
			order: [['rating', 'DESC']],
			limit: 15,
			attributes: ['id', 'name_ru', 'name_en', 'poster', 'rating', 'world_premier'],
			include: [
				{
					model: this.genreRepository,
					through: {attributes: []},
					where: {
						name_en: {
							[Op.iLike]: `%${filter.genre ? filter.genre : ''}%`
						}
					}
				},
				{
					model: this.countryRepository,
					through: {attributes: []},
					where: {
						name: {
							[Op.iLike]: `%${filter.country}%`,
						}
					},
				},
			],
			where: {
				rating: {
					[Op.gte]: filter.rating
				},
				marks: {
					[Op.gte]: filter.marks
				},
				world_premier: {
					[Op.between]: [
						this.createStartDateOfYear(filter.year === 0 ? 1900 : filter.year),
						this.createEndDateOfYear(filter.year === 0 ? 2100 : filter.year)
					]
				},
			},
		})

		return result
	}

	private notFoundException() {
		throw new RpcException({
			message: 'Not Found',
			status: HttpStatus.NOT_FOUND
		})
	}

	private createStartDateOfYear(year: number) {
		let result = new Date()
		result.setUTCFullYear(year)
		result.setUTCMonth(0)
		result.setUTCDate(0)
		result.setUTCHours(0)
		result.setUTCMinutes(0)
		result.setUTCMilliseconds(0)
		result.setUTCSeconds(0)
		return new Date(result)
	}

	private createEndDateOfYear(year: number) {
		let result = new Date()
		result.setUTCFullYear(year)
		result.setUTCMonth(11)
		result.setUTCDate(31)
		result.setUTCHours(0)
		result.setUTCMinutes(0)
		result.setUTCMilliseconds(0)
		result.setUTCSeconds(0)
		return new Date(result)
	}

	async getAllGenres() {
		return this.genreRepository.findAll()
	}

	async getAllCountries() {
		return this.countryRepository.findAll()
	}
}
