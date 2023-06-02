import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {Comment} from "./comment.model";

interface ISubcomment {
	id: number
	commentId: number
	userId: number
	text: string

}

@Table({tableName: 'subcomments', updatedAt: false, freezeTableName: true})
export class Subcomment extends Model<Subcomment, ISubcomment> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@ForeignKey(() => Comment)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	commentId: number

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

}
