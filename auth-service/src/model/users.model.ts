import {Column, DataType, Model, Table} from "sequelize-typescript";

interface IUser {
	id: number
	login: string
	password: string
	role: string
}

@Table({tableName: 'users', updatedAt: false, freezeTableName: true})
export class User extends Model<User, IUser> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false
	})
	login: string

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	password: string

	@Column({
		type: DataType.ENUM('user', 'admin'),
		defaultValue: 'user'
	})
	role: string

}