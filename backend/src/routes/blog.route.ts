import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt';


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    jwtPayload: string
  }
}>();


// Get the header and verify the token
blogRouter.use('/*', async (c, next) => { 
  try {
    const authHeader = c.req.header('Authorization') || '';
    const response = await verify(authHeader, c.env.JWT_SECRET);
    if (response) {
      c.set('jwtPayload', response.id );
      await next();
    }
  } catch (error) {
    // console.error(error);
    c.status(403);
    return c.json({ message: 'UnAuthorized' });
  }
});


// Get all blogs
blogRouter.get('/bulk', async (c) => {
  return c.json({ message: 'Blogs' });
});


// Create a blog
blogRouter.post('/', async (c) => {
  return c.json({ message: 'Blog Created' });
});