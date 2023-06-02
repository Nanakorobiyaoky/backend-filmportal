import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UserIdGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const [, token] = authHeader.split(" ");

      const user = this.jwtService.verify(token);

      const reqId: number = req.body.id;
      const userId: number = user.id;

      if (reqId == userId) return true;
      throw new Error();

    } catch (err) {
      throw new HttpException("No access", HttpStatus.FORBIDDEN);
    }

  }

}