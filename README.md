# Super Svelte Stack

Full-stack web app framework built upon <b>SvelteKit</b>.

Other technologies/packages used include:

- TailwindCSS
- Auth.js
- Prisma
- PostgreSQL
- bcryptjs
- AWS SES
- nodemailer

## Setup

First, clone the repository.

```
git clone https://github.com/freddyshim/super-svelte-stack
cd super-svelte-stack
```

Once you pulled the latest version, create a `.env` file in the root directory with the following environment variables. Make sure to replace the placeholder values with your own.

```
BASE_URL=http://localhost:5173
DATABASE_URL=postgresql://USER:PASSWORD@URL:PORT/DBNAME
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AUTH_SECRET=your-jwt-secret
AUTH_TRUST_HOST=true
SMTP_EMAIL=your-email
SMTP_SERVER=your-email-server
SMTP_PORT=your-email-port
SMTP_USERNAME=your-email-username
SMTP_PASSWORD=your-email-password
AWS_ACCESS_KEY_ID=aws-key
AWS_SECRET_ACCESS_KEY=aws-secret
AWS_REGION=aws-region
```

Now that you have all the required environment variables, begin to initialize the project. This step involves <b>a)</b> installing Node packages, <b>b)</b> creating schema tables in your database and <b>c)</b> creating Prisma types to use in the project.

```
npm i
npx prisma migrate dev --name init
npx prisma generate
```

Finally, you are ready to run the development server.

```
npm run dev
```
