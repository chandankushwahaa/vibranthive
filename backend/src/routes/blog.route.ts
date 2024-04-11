import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt';


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();


// blogRouter.use('/*', async (c, next) => {
//   try {
//     const authHeader = c.req.header('Authorization') || '';
//     const response = await verify(authHeader, c.env.JWT_SECRET);
//     if (response) {
//       c.set('jwtPayload', { userId: response.id });
//       await next();
//     }
//   } catch (error) {
//     // console.error(error);
//     c.status(403);
//     return c.json({ message: 'UnAuthorized' });
//   }
// });


blogRouter.get('/bulk', async (c) => {
  return c.json({ message: 'Blogs' });
});

// Create a blog
blogRouter.post('/', async (c) => {
  return c.json({ message: 'Create a blog' });
});