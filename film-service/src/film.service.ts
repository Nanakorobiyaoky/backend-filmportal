import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "./models/films.model";
import {Genre} from "./models/genres.model";
import {Country} from "./models/countries.model";
import {FilmBudget} from "./models/films-budget.model";

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private readonly filmsRepository: typeof Film,
              @InjectModel(Genre) private readonly genreRepository: typeof Genre) {}
  async getFilmById(id: number) {
    const film = await this.filmsRepository.findByPk(id, {
      include: [
        {
          model: Country,
          through: {attributes: []},
        },
        {
          model: Genre,
          through: {attributes: []},
        },
        {
          model: FilmBudget,
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
        model: Film,
        attributes: ['id', 'name_ru', 'name_en', 'rating', 'poster'],
        through: {attributes: []},
        include: [
          {
            model: Genre,
            through: {attributes: []},
          }
        ]
      }
    })

    return films

  }
}
