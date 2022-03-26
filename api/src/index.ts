import fastify from "fastify";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const app = fastify({ logger: true });
const port = process.env.PORT || 3000;

// Register routes
app.register(require("./routes/fursona"), { prefix: "/fursona" });
app.get("/", (_request, reply) => {
  reply.send({ hello: "world" });
});

// Conntacts to mongoDB
mongoose
  .connect("mongodb://localhost:27017/fursona")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to mongoDB: ", err);
  });

app.listen(port, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
