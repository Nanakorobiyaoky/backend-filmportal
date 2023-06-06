import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';
import { FilmModule } from './film.module';
import { AuthModule } from '../auth/auth.module';
import { FilterDto } from 'src/dto/filter.dto';

describe('FilmController', () => {
  let Controller: FilmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FilmModule, AuthModule],
      controllers: [FilmController],
    }).compile();

    Controller = module.get<FilmController>(FilmController);
  });

  it('should be defined', () => {
    expect(Controller).toBeDefined();
  });

  describe('getFilmById', () => {
    it('Check Id', async () => {
      const id = 1
      const result = new Promise((resolve, reject) => { resolve({ id: id }) })

      expect(await Controller.getFilmById(id)).toMatchObject(result)
    })
  })

  describe('getFilmsNoFilter', () => {
    it('Check Length', async () => {
      expect(await Controller.getFilmsNoFilter()).toHaveLength(15)
    })
  })

  describe('getFilmsByFilterAndGenre', () => {
    it('Check genre', async () => {
      const noFilter: FilterDto = {
        pageIndex: 0,
        year: 0,
        rating: 0,
        marks: 0,
        country: '',
        actors: '',
        directors: '',
      }
      const genre = 'drama'

      expect(await Controller.getFilmsByFilterAndGenre(noFilter, genre)).toBeDefined()
    })
  })
});
