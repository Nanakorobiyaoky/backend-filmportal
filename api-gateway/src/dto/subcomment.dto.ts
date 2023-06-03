import {UserInCommentDto} from "./user-in-comment.dto";

export class SubcommentDto {
	id: number
	text: string
	createdAt: string
	user: UserInCommentDto
}