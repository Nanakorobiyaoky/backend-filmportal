import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {JwtModule} from "@nestjs/jwt";


@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		ClientsModule.register([
			{
				name: 'AUTH_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
					queue: 'auth_queue',
					queueOptions: {
						durable: true
					}
				},
			},
		]),
		JwtModule.register({
			secret: process.env.SECRET || 'THIS_IS_SECRET',
			signOptions: {
				expiresIn: process.env.EXPIRES_IN || '24h'
			}
		})
	],
	providers: [AuthService],
	controllers: [AuthController]
})
export class AuthModule {
}
