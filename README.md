# Vibranthive
Vibranthive is a modern blogging application inspired by platforms like Medium, designed to empower users to share their ideas and stories with the world. 

## Tech Stack
### Frontend

- **React**: A JavaScript library for building user interfaces, providing a flexible and efficient way to create dynamic web applications.
- **Zod**: A TypeScript-first schema declaration and validation library, enabling robust type checking and validation of frontend data.
- **TypeScript**: A statically typed superset of JavaScript that enhances code quality, maintainability, and developer productivity.
- **JWT (JSON Web Tokens):** A standard for securely transmitting information between parties as a JSON object, commonly used for authentication in web applications.


### Backend
- **Cloudflare Workers**: A serverless execution environment that allows you to run JavaScript code at the edge of the Cloudflare network, providing scalable and efficient backend logic. [hono](https://hono.dev/top)
- **TypeScript**: Leveraged for backend development as well, ensuring consistent type safety and code integrity across the entire application.
- **Prisma**: A modern ORM (Object-Relational Mapping) tool that simplifies database access and manipulation, offering type-safe database queries and schema migrations.
- **PostgreSQL**: A powerful open-source relational database management system, chosen for its reliability, scalability, and extensive feature set.


## Getting Started


1. Clone the repository:

```bash
git clone https://github.com/your-username/vibranthive.git
```
2. Navigate to the project directory:
```bash
cd vibranthive
```
3. Install dependencies for both the frontend and backend:
```bash
cd frontend
npm install
```
```bash
cd ../backend
npm install
```
4. Create a `.env` and `wrangler.toml` file inside backend.

   - inside `.env` - Use [AIVEN](https://aiven.io/) postgres database
    ```
    DATABASE_URL="PASTE DATABASE URL"
    ```
    #### Creating Connection Pool
    - Move to [PRISMA](https://www.prisma.io/data-platform/accelerate) site create a new Project. Click Enable Accelerate.
    - Under Database Connection String PASTE THE AIVEN DB URL created initially.
    - Click ENABLE ACCELERATE
    - Click Generate API KEY
    - A URL is generated paste inside `wrangler.toml` file 
    > It create a POOL url which we give to our backend not the orginal DB url. It help to connect to our database.

    ```
    name = "backend"
    compatibility_date = "2023-12-01"

    [vars]
    DATABASE_URL="PASTE the PRISMA URL (Connection Pool)"
    
    JWT_SECRET="mytoken"
    ```

5. Start the `backend` server using Cloudflare Workers:

```bash
npm run dev
```
6. Start the `frontend` development server:
```bash
npm run dev
```

- **NOTE** If you make changes in the database i.e `schema.prisma` file you need to migrate using the follwing command to tell the database the the table you had added is been altered.
```bash
npx prisma migrate dev --name init_schema
```
- It will generate migration folder inside prisma.
- And then Generate the prisma client 
```
npx prisma generate --no-engine
```

Access in your browser at http://localhost:3000.


### To Deploy

```
npx wrangler whoami
```
```
npx wrangler login
```
```
npm run deploy
```

> cloudflare worker not take environment variable from `.env` file it takes from `wrangle.toml` file

> - This code snippet demonstrates the usage of Cloudflare Workers and the need for a connection pool when connecting to a database.
> - Cloudflare Workers create multiple instances distributed throughout the world. When deploying the code, each instance connects to the database, which can be inefficient and potentially overload the database.
> - To address this issue, it is recommended to use a connection pool. In this code, the `prisma` library is used for managing the connection pool and connecting to the database.
