// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PaymentsService } from './payments.class'

// Main data model schema
export const paymentsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Payments', additionalProperties: false }
)
export type Payments = Static<typeof paymentsSchema>
export const paymentsValidator = getValidator(paymentsSchema, dataValidator)
export const paymentsResolver = resolve<Payments, HookContext<PaymentsService>>({})

export const paymentsExternalResolver = resolve<Payments, HookContext<PaymentsService>>({})

// Schema for creating new entries
export const paymentsDataSchema = Type.Pick(paymentsSchema, ['text'], {
  $id: 'PaymentsData'
})
export type PaymentsData = Static<typeof paymentsDataSchema>
export const paymentsDataValidator = getValidator(paymentsDataSchema, dataValidator)
export const paymentsDataResolver = resolve<Payments, HookContext<PaymentsService>>({})

// Schema for updating existing entries
export const paymentsPatchSchema = Type.Partial(paymentsSchema, {
  $id: 'PaymentsPatch'
})
export type PaymentsPatch = Static<typeof paymentsPatchSchema>
export const paymentsPatchValidator = getValidator(paymentsPatchSchema, dataValidator)
export const paymentsPatchResolver = resolve<Payments, HookContext<PaymentsService>>({})

// Schema for allowed query properties
export const paymentsQueryProperties = Type.Pick(paymentsSchema, ['id', 'text'])
export const paymentsQuerySchema = Type.Intersect(
  [
    querySyntax(paymentsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PaymentsQuery = Static<typeof paymentsQuerySchema>
export const paymentsQueryValidator = getValidator(paymentsQuerySchema, queryValidator)
export const paymentsQueryResolver = resolve<PaymentsQuery, HookContext<PaymentsService>>({})
