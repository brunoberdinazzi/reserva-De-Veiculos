// import Database from '@ioc:Adonis/Lucid/Database'
import Vehicle from 'App/Modules/Vehicle/Vehicle'
import Reservation from 'App/Modules/Vehicle/Reservation'
import Sale from 'App/Modules/Vehicle/Sale'

export default class VehicleController {

  public async insert({request}) {
    // const id = await Database
    // .table('vehicles')
    // .insert({
    //   brand: 'Ford',
    //   model: 'Ka',
    //   year: '1998',
    //   km: '2000000',
    //   color: 'Verde Musgo',
    //   chassi: '1199ABVC',
    //   price: 10000,
    // })

    const vehicle = await Vehicle.create(request.all())
    await vehicle?.load('reservation')
    await vehicle?.load('sale')

    return {success: true, vehicle}
  }

  public async getAll({request}) {
    const limit = request.input('limit', 10)
    const page = request.input('page', 1)

    // return Database
    //   .from('vehicles')
    //   .select('*')
    //   .paginate(page, limit)

    // TODO: pagination
    const vehicles = await Vehicle.query()
      .preload('reservation')
      .preload('sale')

    return vehicles
  }

  public async getOne({request}) {
    // return Database
    //   .from('vehicles')
    //   .select('*')
    //   .where('id', request.params('id'))

    const vehicle = await Vehicle.find(request.param('id'))
    await vehicle?.load('reservation')
    await vehicle?.load('sale')
    return vehicle
  }

  public async update({request}) {
    // const updatedRowsCount = await Database
    //   .from('vehicles')
    //   .where('id', request.params('id'))
    //   .update({ brand: 'Ford' })

    const vehicle = await Vehicle.findOrFail(request.param('id'))
    vehicle.merge(request.all())
    await vehicle.save()
    await vehicle?.load('reservation')
    await vehicle?.load('sale')
    return {success: true, vehicle}
  }

  public async delete({request}) {
    // const deletedRowsCount = await Database
    //   .from('vehicles')
    //   .where('id', request.params('id'))
    //   .delete()

    const vehicle = await Vehicle.findOrFail(request.param('id'))
    await vehicle.delete()

    return {success: true}
  }

  public async reserve({request}) {
    const vehicle = await Vehicle.findOrFail(request.param('id'))
    const employee = await Vehicle.findOrFail(request.input('employee_id'))

    if (vehicle.status !== 'available') {
      return {success: false, error: 'Vehicle unavailable'}
    }

    vehicle.merge({status: 'reserved'})
    await vehicle.save()

    const reservation = await Reservation.create({
      vehicleId: request.input('vehicle_id'),
      employeeId: request.input('employee_id'),
      value: request.input('value'),
    })
    await employee.related('reservation').save(reservation)
    await vehicle.related('reservation').save(reservation)

    await vehicle?.load('reservation')
    await vehicle?.load('sale')

    return {success: true, vehicle}
  }

  public async buy({request}) {
    const vehicle = await Vehicle.findOrFail(request.param('id'))
    await vehicle?.load('reservation')
    const employee = await Vehicle.findOrFail(request.input('employee_id'))

    // console.log(vehicle.reservation)
    console.log(typeof vehicle.reservation.employeeId)
    console.log(typeof request.input('employee_id'))

    if (vehicle.status === 'sold' || (vehicle.status === 'reserved' && vehicle.reservation?.employeeId != request.input('employee_id'))) {
      return {success: false, error: 'Vehicle unavailable'}
    }

    vehicle.merge({status: 'sold'})
    await vehicle.save()

    const sale = await Sale.create({
      vehicleId: request.input('vehicle_id'),
      employeeId: request.input('employee_id'),
      value: request.input('value'),
    })
    await employee.related('sale').save(sale)
    await vehicle.related('sale').save(sale)

    await vehicle?.load('reservation')
    await vehicle?.load('sale')

    return {success: true, vehicle}
  }
}
