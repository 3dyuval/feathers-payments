// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  paymentsDataValidator,
  paymentsPatchValidator,
  paymentsQueryValidator,
  paymentsResolver,
  paymentsExternalResolver,
  paymentsDataResolver,
  paymentsPatchResolver,
  paymentsQueryResolver
} from './payments.schema'

import type { Application } from '../../declarations'
import { PaymentsService, getOptions } from './payments.class'
import { paymentsPath, paymentsMethods } from './payments.shared'

export * from './payments.class'
export * from './payments.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const payments = (app: Application) => {
  // Register our service on the Feathers application
  app.use(paymentsPath, new PaymentsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: paymentsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
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
      patch: [
        schemaHooks.validateData(paymentsPatchValidator),
        schemaHooks.resolveData(paymentsPatchResolver)
      ],
      remove: []
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
