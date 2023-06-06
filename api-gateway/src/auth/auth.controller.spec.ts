import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { LoginPasswordDto } from '../dto/login-password.dto';
// import { UserInfoTokenDto } from '../dto/user-info-token.dto';

describe('AuthController', () => {
  let Controller: AuthController;
  // let Service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [AuthController],
      // providers: [AuthService]
    }).compile();

    Controller = module.get<AuthController>(AuthController);
    // Service = module.get<AuthService>(AuthService);
  });

  describe('define', () => {
    it('should be defined', () => {
      expect(Controller).toBeDefined();
    });
  });

  describe('register', () => {
    it('Register', async () => {
      const result = new Promise((resolve, reject) => { resolve({ id: 1, login: 'abc@mail.ru', createdAt: 'defg', role: 'user' }) })
      const user: LoginPasswordDto = { login: 'abc@mail.ru', password: 'defg', role: 'user' }
      // jest.spyOn(Service, 'registerUser').mockImplementation(() => result);
      // const result = Service.registerUser(user)

      expect(Controller.registerUser(user)).toMatchObject(result);
    });
  });

  describe('login', () => {
    it('Login', async () => {
      const result = new Promise((resolve, reject) => { resolve({ id: 1, login: 'abc@mail.ru', createdAt: 'defg', role: 'user' }) })
      const user: LoginPasswordDto = { login: 'abc@mail.ru', password: 'defg', role: 'user' }
      // jest.spyOn(Service, 'loginUser').mockImplementation(() => result);
      // const result = Service.loginUser(user)

      expect(Controller.loginUser(user)).toMatchObject(result);
    });
  });
});
