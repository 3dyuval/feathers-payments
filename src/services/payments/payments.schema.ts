import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { getValidator, querySyntax, Type } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PaymentsService } from './payments.class'

export enum Status {
    Initiated = 'initiated',
    Processing = 'processing',
    Succeeded = 'succeeded',
    Failed = 'failed',
    PendingRetry = 'pendingRetry',
    Refunded = 'refunded',
    Cancelled = 'cancelled',
}

export const StatusSchema = Type.Enum(Status)

export const paymentsSchema = Type.Object(
    {
        id: Type.Number({ title: 'pKey'}),
        payment_id: Type.Number({ format: 'uuid' }),
        status: StatusSchema,
        timestamp: Type.String({ format: 'date-time' }),
        metadata: Type.Optional(Type.Object({}, { additionalProperties: true }))
    },
    {$id: 'Payments', additionalProperties: false}
)

export type Payments = Static<typeof paymentsSchema>
export const paymentsValidator = getValidator(paymentsSchema, dataValidator)
export const paymentsResolver = resolve<Payments, HookContext<PaymentsService>>({})

export const paymentsExternalResolver = resolve<Payments, HookContext<PaymentsService>>({})

// Schema for creating new entries
export const paymentsDataSchema = Type.Pick(paymentsSchema, ['payment_id', 'status', 'metadata'] as const, {
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
export const paymentsQueryProperties = Type.Pick(paymentsSchema, ['payment_id', 'status'] as const)
export const paymentsQuerySchema = Type.Intersect(
    [
        querySyntax(paymentsQueryProperties),
        Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type PaymentsQuery = Static<typeof paymentsQuerySchema>
export const paymentsQueryValidator = getValidator(paymentsQuerySchema, queryValidator)
export const paymentsQueryResolver = resolve<PaymentsQuery, HookContext<PaymentsService>>({})
