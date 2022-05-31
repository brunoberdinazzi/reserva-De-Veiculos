import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmployeesUpdates extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('nome')
      table.string('name').notNullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name')
      table.string('nome').notNullable()
    })
  }
}
