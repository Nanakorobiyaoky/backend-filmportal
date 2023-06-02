import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Subcomment} from "./subcomment.model";
import {Comment} from "./comment.model";

interface IUser {
	id: number
	login: string

}

@Table({tableName: 'users', timestamps: false, freezeTableName: true})
export class User extends Model<User, IUser> {

	@Column({
		type: DataType.INTEGER,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	login: string

	@HasMany(() => Comment)
	comments: Comment[]

	@HasMany(() => Subcomment)
	subcomments: Subcomment[]
}
