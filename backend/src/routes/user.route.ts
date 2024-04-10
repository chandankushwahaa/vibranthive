import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();


// SignUP
// userRouter.post("/signup", async (c) => {
//   const prisma = new PrismaClient();
//     datasourceUrl: c.env?.DATABASE_URL,
// }).$extend(withAccelerate());