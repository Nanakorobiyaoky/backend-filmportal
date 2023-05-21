import { BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Film} from "./films.model";
import {FilmGenre} from "./films-genres.model";

interface IGenre {
	id: number
	name_ru: string
	name_ru_singular: string

	name_en: string
}

@Table({tableName: 'genres', timestamps: false, freezeTableName: true})
export class Genre extends Model<Genre, IGenre> {

	@Column( {
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column( {
		type: DataType.STRING,
	})
	name_ru: string

	@Column( {
		type: DataType.STRING,
	})
	name_ru_singular: string

	@Column( {
		type: DataType.STRING,
	})
	name_en: string

	@BelongsToMany(() => Film, () => FilmGenre)
	films: Film[]


}