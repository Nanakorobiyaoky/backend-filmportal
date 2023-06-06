import {UserInCommentDto} from "./user-in-comment.dto";
import {SubcommentDto} from "./subcomment.dto";
import {IsDefined} from "class-validator";

export class CommentDto {
	id: number
	text: string
	createdAt: string
	user: UserInCommentDto
	subcomments: SubcommentDto[]
}