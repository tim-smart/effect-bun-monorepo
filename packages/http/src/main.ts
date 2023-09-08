import { HttpLive } from "@app/http/Http"
import * as Http from "@effect/platform-bun/HttpServer"
import { Config, Effect, Layer } from "effect"
import { runMain } from "@effect/platform-bun/Runtime"

const ServerLive = Http.server.layerConfig({
  port: Config.withDefault(Config.integer("PORT"), 3000),
})

const MainLive = HttpLive.pipe(Layer.use(ServerLive))

Layer.launch(MainLive).pipe(Effect.tapErrorCause(Effect.logError), runMain)
