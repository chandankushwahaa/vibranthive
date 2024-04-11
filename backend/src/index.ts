import { Hono } from 'hono';
import { cors } from 'hono/cors';
// import { userRouter } from './routes/user.route';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt';


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.use("/*", cors())
// app.route("/api/v1/user", userRouter)


app.use('/api/v1/blog/*', async(c, next) => {

  const header = c.req.header('Authorization') || ''
  const response = await verify(header, c.env.JWT_SECRET)
  if(response.id){
    next()
  }else{
    c.status(403)
    return c.json({ message: 'Invalid token' })
  }
})

app.use('/api/v1/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password
    }
  })

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ 
    jwt: token 
  })
})


// SignIN
app.use('/api/v1/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password
    }
  })

  if (!user) {
    c.status(403)
    return  c.json({ message: 'Invalid credentials' })
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ 
    jwt: token 
  })
})

export default app
