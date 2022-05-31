import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reservations extends BaseSchema {
  protected tableName = 'reservations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('vehicle_id')
      table.integer('employee_id')
      table.dateTime('date')
      table.decimal('value')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
