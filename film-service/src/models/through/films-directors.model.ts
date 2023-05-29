import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "../films.model";

interface IFilmDirector{
	film_id: number
	person_id: number
}

@Table({tableName: 'films_directors', timestamps: false, freezeTableName: true})
export class FilmDirector extends Model<FilmDirector, IFilmDirector> {
	@ForeignKey(() => Film)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
	})
	film_id: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
	})
	person_id: number

	@BelongsTo(() => Film)
	film: Film
}
