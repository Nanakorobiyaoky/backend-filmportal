import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Person} from "../persons.model";

interface IFilmVoice{
	film_id: number
	person_id: number
}

@Table({tableName: 'films_voices', timestamps: false, freezeTableName: true})
export class FilmVoice extends Model<FilmVoice, IFilmVoice> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
	})
	film_id: number

	@ForeignKey(() => Person)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
	})
	person_id: number

	@BelongsTo(() => Person)
	person: Person
}
