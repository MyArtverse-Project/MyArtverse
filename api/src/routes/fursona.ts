import faker from "@faker-js/faker";
import { randomInt } from "crypto";
import { FastifyInstance } from "fastify";

const fursonaRoute = (app: FastifyInstance, _opts: any, done: () => void) => {
  app.get("/hot", async (_request, reply) => {
    const sona = generateFursona();
    reply.send({
      hotSonas: sona
    });
    done();
  });

  app.get("/", (_request, reply) => {
    reply.send({ hello: "world" });
  });
  done();
};

// Creates a array of 10 fursona with random values
const generateFursona = () => {
  const fursona = [];
  for (let i = 0; i < 10; i++) {
    fursona.push({
      id: i,
      name: faker.name.firstName(),
      likes: randomInt(10000),
      profilePic: faker.image.avatar()
    });
  }
  return fursona;
};

export default fursonaRoute;
