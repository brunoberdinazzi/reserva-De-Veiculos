import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vehicles extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('brand').notNullable()
      table.string('model').notNullable()
      table.integer('year').notNullable()
      table.float('km').nullable()
      table.string('color').notNullable()
      table.string('chassi').unique().notNullable()
      table.decimal('price').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
