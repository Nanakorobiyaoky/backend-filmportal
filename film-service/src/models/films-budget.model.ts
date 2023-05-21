import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./films.model";

interface IFilmBudget {
	film_id: number
	currency: string
	number: number
}

@Table({tableName: 'films_budget', timestamps: false, freezeTableName: true})
export class FilmBudget extends Model<FilmBudget, IFilmBudget> {
	@ForeignKey(()=> Film)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
	})
	film_id: number

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	currency: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	number: number

}