import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRouter } from './routes/user.route';
import { verify } from 'hono/jwt';


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.use("/*", cors())
app.route("/api/v1/user", userRouter)


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

export default app
