import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "./models/films.model";
import {Genre} from "./models/genres.model";
import {Country} from "./models/countries.model";
import {FilmBudget} from "./models/films-budget.model";

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private readonly filmsRepository: typeof Film,
              @InjectModel(Genre) private readonly genreRepository: typeof Genre,
              @InjectModel(Country) private readonly countryRepository: typeof Country,
              @InjectModel(FilmBudget) private readonly filmBudgetRepository: typeof FilmBudget,
  ) {}
  async getFilmById(id: number) {
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
    return film
  }

  async getFilmsByGenre(genre: string) {

    const films = await this.genreRepository.findOne({
      where: {
        name_en: genre
      },
      include: {
        model: this.filmsRepository,
        attributes: ['id', 'name_ru', 'name_en', 'rating', 'poster'],
        through: {attributes: []},
        include: [
          {
            model: this.genreRepository,
            through: {attributes: []},
          }
        ]
      }
    })

    return films

  }

  async getFilmsByPersonId(data) {
    for (let key in data) {
      let filmIdArray = data[key]

      if (!Array.isArray(filmIdArray) || filmIdArray.length === 0) {
        continue
      }

      data[key] = await this.filmsRepository.findAll({
        where: {
          id: filmIdArray.map((obj) => obj.film_id)
        },
        attributes: ['id', 'name_ru', 'name_en', 'poster', 'rating'],
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
}
