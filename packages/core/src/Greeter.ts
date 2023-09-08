import { Context, Effect, Layer } from "effect"

const make = Effect.gen(function* (_) {
  return {
    greet: Effect.succeed("Hello, World!"),
  } as const
})

export interface Greeter extends Effect.Effect.Success<typeof make> {}
export const Greeter = Context.Tag<Greeter>("@app/core/Greeter")
export const GreeterLive = Layer.effect(Greeter, make)
