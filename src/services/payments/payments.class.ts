// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Payments, PaymentsData, PaymentsPatch, PaymentsQuery } from './payments.schema'

export type { Payments, PaymentsData, PaymentsPatch, PaymentsQuery }

export interface PaymentsParams extends KnexAdapterParams<PaymentsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PaymentsService<ServiceParams extends Params = PaymentsParams> extends KnexService<
  Payments,
  PaymentsData,
  PaymentsParams,
  PaymentsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'payment_status'
  }
}
