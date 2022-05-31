import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.post('/', 'VehiclesController.insert')
    Route.get('/', 'VehiclesController.getAll')
    Route.get('/:id', 'VehiclesController.getOne')
    Route.put('/:id', 'VehiclesController.update')
    Route.delete('/:id', 'VehiclesController.delete')

    Route.post('/:id/reserve', 'VehiclesController.reserve')
    Route.post('/:id/buy', 'VehiclesController.buy')
  })
  .prefix('/vehicles')
  .namespace('App/Modules/Vehicle')

