## Base exchange challenge

This repository contains files from the website created for the base exchange company challenge.

First, install the dependencies using:

```bash
npm install
# or
yarn install
```

### Environment variable configuration
Create a .env file in the project root and insert the variables:

- DATABASE_URL=
- JWT_SECRET=

### Configuring Prisma ORM
This project uses Prisma ORM to connect and manipulate data in the database. Therefore, it is necessary to run the command: `npx prisma generate`

### Run project
Use one of the commands below to run the application in the development environment:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Author
- Grazielle Conceição