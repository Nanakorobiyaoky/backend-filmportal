import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Person} from "../persons.model";

interface IFilmWriters{
	film_id: number
	person_id: number
}

@Table({tableName: 'films_composers', timestamps: false, freezeTableName: true})
export class FilmWriters extends Model<FilmWriters, IFilmWriters> {
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

	@BelongsTo(() => Person, 'id')
	person: Person
}
