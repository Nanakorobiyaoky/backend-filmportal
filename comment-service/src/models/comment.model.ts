import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {Subcomment} from "./subcomment.model";

interface IComment {
	id: number
	filmId: number
	userId: number
	text: string

}

@Table({tableName: 'comments', updatedAt: false, freezeTableName: true})
export class Comment extends Model<Comment, IComment> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	filmId: number

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	userId: number

	@Column({
		type: DataType.TEXT,
		allowNull: false
	})
	text: string

	@BelongsTo(() => User)
	user: User

	@HasMany(() => Subcomment)
	subcomments: Subcomment[]

}
