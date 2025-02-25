import { Application } from "../../declarations";
import { SomeService } from "./some-service.class";
import { someHook } from "../../hooks/some-hook";
import { logError } from "../../hooks/log-error";

const servicePath = 'some-service';
const serviceMethods: Array<keyof SomeService> = ['find'];

export const someService = (app: Application) => {
    app.use(servicePath, new SomeService(app), {
        methods: serviceMethods,
        events: []
    });

    app.service(servicePath).hooks({
        around: {
            all: [logError, someHook]
        }
    });
}

declare module '../../declarations' {
    interface ServiceTypes {
        [servicePath]: SomeService
    }
}

