import {HttpStatus, Injectable} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "./models/comment.model";
import {User} from "./models/user.model";
import {Subcomment} from "./models/subcomment.model";
import {CreateSubcommentDto} from "./dto/create-subcomment.dto";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment) private readonly commentRepository: typeof Comment,
		@InjectModel(Subcomment) private readonly subcommentRepository: typeof Subcomment,
		@InjectModel(User) private readonly userRepository: typeof User

	) {}

	async createComment(createCommentDto: CreateCommentDto) {

		const {filmId, text, userId, userLogin} = createCommentDto

		await this.findOrCreateUser(userId, userLogin)

		try {
			await this.commentRepository.create({
				filmId: filmId,
				text: text,
				userId: userId
			})
		} catch {}

	}

	async createSubcomment(createSubcommentDto: CreateSubcommentDto) {

		const {commentId, userId, text, userLogin} = createSubcommentDto

		await this.findOrCreateUser(userId, userLogin)

		try {
			await this.subcommentRepository.create({
				commentId: commentId,
				userId: userId,
				text: text
			})
		} catch {}

	}

	private async findOrCreateUser(userId: number, userLogin: string) {
		await this.userRepository.findOrCreate({
			where: {
				id: userId,
				login: userLogin
			}
		})
	}

	async getCommentsByFilmId(id: number) {
		try {
			const comments = await this.commentRepository.findAll({
				where: {
					filmId: id,
				},
				order: [
					['createdAt', 'ASC'],
					['subcomments', 'createdAt', 'ASC']
				],
				attributes: {
					exclude: [
						'filmId', 'userId'
					]
				},
				include: [
					{
						model: User
					},
					{
						model: this.subcommentRepository,
						as: 'subcomments',
						attributes: {
							exclude: ['commentId', 'userId']
						},
						include: [
							{
								model: User
							}
						]
					}
				]
			})

			return comments

		} catch {
			throw new RpcException({
				message: 'Internal server error',
				status: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
