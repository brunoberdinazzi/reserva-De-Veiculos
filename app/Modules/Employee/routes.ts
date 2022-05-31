import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.post('/', 'EmployeesController.insert')
    Route.get('/', 'EmployeesController.getAll')
    Route.get('/:id', 'EmployeesController.getOne')
    Route.put('/:id', 'EmployeesController.update')
    Route.delete('/:id', 'EmployeesController.delete')
  })
  .prefix('/employees')
  .namespace('App/Modules/Employee')

