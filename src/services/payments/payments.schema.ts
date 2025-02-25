import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { getValidator, querySyntax, Type } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PaymentsService } from './payments.class'

export enum PaymentStatus {
    Initiated = 'initiated',
    Processing = 'processing',
    Succeeded = 'succeeded',
    Failed = 'failed',
    PendingRetry = 'pendingRetry',
    Refunded = 'refunded',
    Cancelled = 'cancelled',
}

export const StatusSchema = Type.Enum(PaymentStatus)

export const paymentsSchema = Type.Object({
        id: Type.Number({title: 'Auto-incrementing log ID'}),  //Auto-generated
        timestamp: Type.String({format: 'date-time'}),           //Auto-generated
        payment_id: Type.Number({title: 'Payment identifier'}),
        status: Type.Enum(PaymentStatus),
        metadata: Type.Optional(Type.Object({}, {additionalProperties: true})),
    },
    {$id: 'PaymentStatusLog', additionalProperties: false}
)


export type Payments = Static<typeof paymentsSchema>
export const paymentsValidator = getValidator(paymentsSchema, dataValidator)
export const paymentsResolver = resolve<Payments, HookContext<PaymentsService>>({})

export const paymentsExternalResolver = resolve<Payments, HookContext<PaymentsService>>({})

export const paymentsDataSchema = Type.Pick(paymentsSchema, ['payment_id', 'status', 'metadata'] as const, {
    $id: 'PaymentStatusEntry'
})

export type PaymentsData = Static<typeof paymentsDataSchema>
export const paymentsDataValidator = getValidator(paymentsDataSchema, dataValidator)
export const paymentsDataResolver = resolve<Payments, HookContext<PaymentsService>>({})


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
