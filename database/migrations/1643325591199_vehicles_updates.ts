import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VehiclesUpdates extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enu('status', ['available', 'reserved', 'sold'], {
        useNative: true,
        enumName: 'vehicle_status',
        existingType: false,
      })
      .defaultTo('available')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }
}
