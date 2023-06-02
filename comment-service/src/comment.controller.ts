import {Controller} from '@nestjs/common';
import {CommentService} from './comment.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CreateSubcommentDto} from "./dto/create-subcomment.dto";

@Controller()
export class CommentController {
	constructor(private readonly commentService: CommentService) {
	}

	@EventPattern({cmd: 'create comment'})
	createComment(@Payload() createCommentDto: CreateCommentDto) {
		this.commentService.createComment(createCommentDto)
	}

	@EventPattern({cmd: "create subcomment"})
	createSubcomment(@Payload() createSubcommentDto: CreateSubcommentDto) {
		this.commentService.createSubcomment(createSubcommentDto)
	}

	@MessagePattern({cmd: "get comments by film id"})
	getCommentsByFilmId(@Payload() id: number) {
		return this.commentService.getCommentsByFilmId(id)
	}


}
