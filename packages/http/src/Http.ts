import { Effect, Layer } from "effect"
import * as Http from "@effect/platform-bun/HttpServer"
import { Greeter, GreeterLive } from "@app/core/Greeter"

const serve = Http.router.empty.pipe(
  Http.router.get(
    "/",
    Greeter.pipe(
      Effect.flatMap(_ => _.greet),
      Effect.map(_ => Http.response.text(_)),
    ),
  ),
  Http.router.get("/ping", Effect.succeed(Http.response.text("pong"))),
  Http.router.get(
    "/headers",
    Effect.map(Http.request.ServerRequest, _ =>
      Http.response.unsafeJson(_.headers),
    ),
  ),

  Effect.catchTag("RouteNotFound", _ =>
    Effect.succeed(Http.response.empty({ status: 404 })),
  ),
  Http.server.serve(Http.middleware.logger),
)

export const HttpLive = Layer.scopedDiscard(serve).pipe(Layer.use(GreeterLive))
