import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Genre} from "./genres.model";
import {Film} from "./films.model";

interface IFilmGenre {
	film_id: number
	genre_id: number
}

@Table({tableName: 'films_genres', timestamps: false, freezeTableName: true})
export class FilmGenre extends Model<FilmGenre, IFilmGenre> {

	@ForeignKey(() => Film)
	@Column({
		type: DataType.INTEGER,
	})
	film_id: number

	@ForeignKey(() => Genre)
	@Column({
		type: DataType.INTEGER,
	})
	genre_id: number
}