import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CreateCommentDto} from "../dto/create-comment.dto";
import {ClientProxy} from "@nestjs/microservices";
import {CreateSubcommentDto} from "../dto/create-subcomment.dto";
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";


@Injectable()
export class CommentService {

	constructor(@Inject("COMMENT_SERVICE") private readonly commentClient: ClientProxy) {
	}

	createComment(createCommentDto: CreateCommentDto) {
		this.commentClient.emit({cmd: "create comment"}, createCommentDto)
	}

	createSubcomment(createSubcommentDto: CreateSubcommentDto) {
		this.commentClient.emit({cmd: "create subcomment"}, createSubcommentDto)
	}

	async getCommentsByFilmId(id: number) {
		const comments = await firstValueFrom(this.commentClient.send({cmd: "get comments by film id"}, id)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)

		return comments
	}
}
