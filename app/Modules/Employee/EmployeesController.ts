// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import Employee from 'App/Modules/Employee/Employee'

export default class EmployeesController {

  public async insert({ request }) {
    // const id = await Database
    // .table('employees')
    // .insert({
    //   name: 'Bruno',
    //   email: 'b@m.com',
    //   cpf: '123.123.123-11',
    //   password: '123!@#',
    // })

    // console.log(request.all());
    // return true;

    const employee = await Employee.create(request.all())

    return {success: true, employee}
  }

  public async getAll({ request }) {
    const limit = request.input('limit', 10)
    const page = request.input('page', 1)

    // return Database
    //   .from('employees')
    //   .select('*')
    //   .paginate(page, limit)

    // TODO: pagination
    const employees = await Employee.query()
      .preload('reservations')
      .preload('sales')

    return employees
  }

  public async getOne({ request }) {
    // return Database
    //   .from('employees')
    //   .select('*')
    //   .where('id', request.param('id'))

    const employee = await Employee.find(request.param('id'))
    await employee?.load('reservations')
    await employee?.load('sales')
    return employee
  }

  public async update({ request }) {
    // const updatedRowsCount = await Database
    //   .from('employees')
    //   .where('id', request.param('id'))
    //   .update({ name: 'Bruno 101' })

    const employee = await Employee.findOrFail(request.param('id'))
    employee.merge(request.all())
    await employee.save()
    return {success: true, employee}
  }

  public async delete({ request }) {
    // const deletedRowsCount = await Database
    //   .from('employees')
    //   .where('id', request.param('id'))
    //   .delete()

    const employee = await Employee.findOrFail(request.param('id'))
    await employee.delete()

    return {success: true}
  }
}
