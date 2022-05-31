import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmployeesUpdates2 extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('avatar')
      table.dropColumn('biografia')
      table.dropColumn('senha')

      table.string('avatar_url').nullable()
      table.text('biography').nullable()
      table.string('password').notNullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('avatar_url')
      table.dropColumn('biography')
      table.dropColumn('password')

      table.string('avatar').nullable()
      table.text('biografia').nullable()
      table.string('senha').notNullable()
    })
  }
}
