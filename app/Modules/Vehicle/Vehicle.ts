import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
// import Employee from 'App/Modules/Employee/Employee'
import Reservation from 'App/Modules/Vehicle/Reservation'
import Sale from 'App/Modules/Vehicle/Sale'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brand: string

  @column()
  public model: string

  @column()
  public year: number

  @column()
  public km: number

  @column()
  public color: string

  @column()
  public chassi: string

  @column()
  public price: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Reservation)
  public reservation: HasOne<typeof Reservation>

  @hasOne(() => Sale)
  public sale: HasOne<typeof Sale>
}
