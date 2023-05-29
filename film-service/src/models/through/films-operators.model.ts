import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "../films.model";

interface IFilmOperator{
	film_id: number
	person_id: number
}

@Table({tableName: 'films_operators', timestamps: false, freezeTableName: true})
export class FilmOperator extends Model<FilmOperator, IFilmOperator> {
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
