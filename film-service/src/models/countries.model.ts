import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {FilmCountry} from "./films-countries.model";
import {Film} from "./films.model";

interface ICountry {
	id: number

	name: string

}

@Table({tableName: 'countries', timestamps: false, freezeTableName: true})
export class Country extends Model<Country, ICountry> {
	@Column( {
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column( {
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	name: string

	@BelongsToMany(() => Film, () => FilmCountry)
	authors: Film[];
}