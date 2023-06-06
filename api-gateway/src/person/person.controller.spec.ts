import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonModule } from './person.module';
import { PersonNamePartDto } from '../dto/person-name-part.dto';
import {firstValueFrom} from "rxjs";

describe('PersonController', () => {
  let Controller: PersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersonModule],
      controllers: [PersonController],
    }).compile()

    Controller = module.get<PersonController>(PersonController);
  })

  describe('define', () => {
    it('should be defined', () => {
      expect(Controller).toBeDefined()
    })
  })


  describe('getPersonsById', () => {
    it('Check Id', async () => {
      const id = 1
      const result = new Promise((resolve, reject) => { resolve({ id: id }) })

      expect(Controller.getPersonById(id)).toMatchObject(result)
    })
  })
})
