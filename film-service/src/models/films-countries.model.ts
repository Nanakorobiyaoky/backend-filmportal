import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Country} from "./countries.model";
import {Film} from "./films.model";

interface IFilmCountry {
	film_id: number
	country_id: number
}

@Table({tableName: 'films_countries', timestamps: false, freezeTableName: true})
export class FilmCountry extends Model<FilmCountry, IFilmCountry> {

	@ForeignKey(() => Film)
	@Column({
		type: DataType.INTEGER,
	})
	film_id: number

	@ForeignKey(() => Country)
	@Column({
		type: DataType.INTEGER,
	})
	country_id: number
}