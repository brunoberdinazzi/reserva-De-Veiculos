import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
// import Vehicle from 'App/Modules/Vehicle/Vehicle'
import Reservation from 'App/Modules/Vehicle/Reservation'
import Sale from 'App/Modules/Vehicle/Sale'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cpf: string

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public avatarUrl: string | null

  @column()
  public biography: string | null

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Reservation)
  public reservations: HasMany<typeof Reservation>

  @hasMany(() => Sale)
  public sales: HasMany<typeof Sale>

  @beforeSave()
  public static async hashPassword (employee: Employee) {
    if (employee.$dirty.password) {
      employee.password = await Hash.make(employee.password)
    }
  }
}
