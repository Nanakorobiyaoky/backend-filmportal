import {Column, DataType, Model, Table} from "sequelize-typescript";

interface IPerson {
	id: number
	name_ru: string
	name_en: string
	birthday: string
	place_of_birth: string
	poster: string
}

@Table({tableName: 'persons', timestamps: false, freezeTableName: true})
export class Person extends Model<Person, IPerson> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	name_ru: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	name_en: string

	@Column({
		type: DataType.DATE,
		allowNull: true,
		defaultValue: null
	})
	birthday: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	place_of_birth: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	poster: string

}