import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  paymentsDataValidator,
  paymentsQueryValidator,
  paymentsResolver,
  paymentsExternalResolver,
  paymentsDataResolver,
  paymentsQueryResolver
} from './payments.schema'

import type { Application } from '../../declarations'
import { PaymentsService, getOptions } from './payments.class'
import { paymentsPath, paymentsMethods } from './payments.shared'


export * from './payments.class'
export * from './payments.schema'

export const payments = (app: Application) => {
  app.use(paymentsPath, new PaymentsService(getOptions(app)), {
    methods: paymentsMethods,
    events: []
  })
  app.service(paymentsPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(paymentsExternalResolver),
        schemaHooks.resolveResult(paymentsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(paymentsQueryValidator),
        schemaHooks.resolveQuery(paymentsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(paymentsDataValidator),
        schemaHooks.resolveData(paymentsDataResolver)
      ],
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [paymentsPath]: PaymentsService
  }
}
