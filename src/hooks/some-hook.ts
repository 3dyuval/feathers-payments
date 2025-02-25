import { HookContext, NextFunction } from "../declarations";
// import { feathers, type HookContext, type NextFunction } from '@feathersjs/feathers'



export const someHook =   async (context: HookContext, next: NextFunction) => {
    debugger
    await next()
}