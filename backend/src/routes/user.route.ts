import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt';
import { signUpInput, signInInput } from "@nullhackers/vibranthive-common";
import { hashpass, comparepass } from "../hashing/PasswordHash";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

// Sign UP
userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  const { success } = signUpInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({ message: 'Invalid input' })
  }

  try {
    const finduser = await prisma.user.findFirst({
      where: {
        email: body.email
      },
    });
    if(finduser) {
      c.status(411);
      return c.json({ message: 'User already exists' })
    }

    const userPassword = await hashpass(body.password)
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: userPassword
      }
    })
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token })

  } catch (error) {
    return c.status(403);
  }
})

// Sign IN
userRouter.post('signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  const { success } = signInInput.safeParse(body);
  if (!success) {
    c.status(411)
    return c.json({ message: 'Invalid input' })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    })

    if (!user) {
      c.status(411)
      return c.json({ message: 'User does not exist' })
    }
    
    const checkUser = await comparepass(body.password, user.password);
    if(!checkUser){
      c.status(403)
      return c.json({ message: 'Invalid password' })
    }

    const { password, ...rest } = user;
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token, user: rest })
    
  } catch (error) {
    return c.status(403);
  }
});

// Get User
userRouter.get('/getuser/:id', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorid = c.req.param("id");
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: authorid,
      },
    });
    if (!user) {
      c.status(411);
      return c.json({
        message: "User does not exist anymore",
      });
    }
    c.status(200);
    return c.json({
      name: user.name,
    });
  } catch (error) {
    c.status(500);
    return c.json("Internal server error");
  }
});

// Check User
userRouter.get('/check', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const token = c.req.header('Authorization') || '';
    const response = await verify(token, c.env.JWT_SECRET)
    if (response) {
      c.status(200)
      return c.json({ response })
    }
  } catch (error) {
    c.status(403)
    return c.json({ message: 'UnAuthorized' })
  }
});