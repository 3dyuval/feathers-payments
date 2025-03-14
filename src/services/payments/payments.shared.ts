import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Payments, PaymentsData, PaymentsQuery, PaymentsService } from './payments.class'

export type { Payments, PaymentsData, PaymentsQuery }

export type PaymentsClientService = Pick<
    PaymentsService<Params<PaymentsQuery>>,
    (typeof paymentsMethods)[number]
>

export const paymentsPath = 'payments'

export const paymentsMethods: Array<keyof PaymentsService> = ['find', 'get', 'create']

export const paymentsClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(paymentsPath, connection.service(paymentsPath), {
        methods: paymentsMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [paymentsPath]: PaymentsClientService
    }
}
