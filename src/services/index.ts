import { payments } from './payments/payments'
import type { Application } from '../declarations'
import { someService } from "./some-service/some-service";

export const services = (app: Application) => {

  app.configure(someService)
  app.configure(payments)
  // All services will be registered here
}
