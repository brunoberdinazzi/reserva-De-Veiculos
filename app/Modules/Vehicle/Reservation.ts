import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Employee from 'App/Modules/Employee/Employee'
import Vehicle from 'App/Modules/Vehicle/Vehicle'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vehicleId: number

  @column()
  public employeeId: number

  @column.dateTime({ autoCreate: true })
  public date: DateTime

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Employee)
  public reservation: BelongsTo<typeof Employee>

  @belongsTo(() => Vehicle)
  public sale: BelongsTo<typeof Vehicle>
}
