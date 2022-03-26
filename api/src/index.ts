import fastify from "fastify";

const app = fastify({ logger: true });
const port = process.env.PORT || 3000;

// Register routes
app.register(require("./routes/fursona"), { prefix: "/fursona" });
app.get("/", (_request, reply) => {
  reply.send({ hello: "world" });
});

app.listen(port, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
