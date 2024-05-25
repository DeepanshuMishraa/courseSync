<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/DeepanshuMishraa/courseSync">
   <img src="./public/courseSync.png" alt="Logo">
  </a>

  <h3 align="center">CourseSync</h3>

  <p align="center">
    The open-source Resource Manager For Students.
    <br />
    <a href="https://course-sync.vercel.app"><strong>Learn more »</strong></a>
    <br />
    <br />
    ·
    <a href="https://course-sync.vercel.app">Website</a>
    ·
    <a href="https://github.com/DeepanshuMishraa/courseSync/issues">Issues</a>

  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About the Project

<img width="100%" alt="dashboard" src="./public/dashboard.png">

# A Resource & Study Material Manager for Students

CourseSync: Organize, Share, Learn. A collaborative platform for students to manage and exchange study materials seamlessly.

### Built With

- [Next.js](https://nextjs.org/?ref=course-sync.vercel.app)
- [React.js](https://reactjs.org/?ref=course-sync.vercel.app)
- [Tailwind CSS](https://tailwindcss.com/?ref=course-sync.vercel.app)
- [Prisma.io](https://prisma.io/?ref=course-sync.vercel.app)
- [Shadcn-ui](https://ui.shadcn.com/?ref=course-sync.vercel.app)

## Contact us

 - [Mail](workrelatedmail2005@gmail.com)
 - [Twitter](https://twitter.com/DeepanshuDipxsy)
 - [Instagram](https://www.instagram.com/deepanshuumishraa)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run Cal.com.

- Node.js (Version: >=18.x)
- PostgreSQL (Version: >=13.x)
- NPM (Version: >=7.x)

> If you want to enable any of the available integrations, you may want to obtain additional credentials for each one. More details on this can be found below under the [integrations section](#integrations).

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/DeepanshuMishraa/courseSync)

   ```sh
   git clone https://github.com/DeepanshuMishraa/courseSync
   ```

   > If you are on Windows, run the following command on `gitbash` with admin privileges: <br> > `git clone -c core.symlinks=true https://github.com/DeepanshuMishraa/courseSync` <br> > This will ensure that symlinks are created correctly.
2. Go to the project folder

   ```sh
   cd courseSync
   ```

3. Install packages with npm

   ```sh
   npm install
   ```

4. Set up your `.env` file

   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `.env` file.
   - Use `openssl rand -base64 32` to generate a key and add it under `CALENDSO_ENCRYPTION_KEY` in the `.env` file.



#### Manual setup

1. Configure environment variables in the `.env` file. Replace `<user>`, `<pass>`, `<db-host>`, and `<db-port>` with their applicable values

   ```
   DATABASE_URL='postgresql://<user>:<pass>@<db-host>:<db-port>'
   ```

   <details>
   <summary>If you don't know how to configure the DATABASE_URL, then follow the steps here to create a quick local DB</summary>

   1. [Download](https://www.postgresql.org/download/) and install postgres in your local (if you don't have it already) or you can visit(https://neon.tech) to  get a postgres db for an free instance

   2. Create your own local db by executing `createDB <DB name>`

   3. Now open your psql shell with the DB you created: `psql -h localhost -U postgres -d <DB name>`

   4. Inside the psql shell execute `\conninfo`. And you will get the following info.  
      ![image](https://user-images.githubusercontent.com/39329182/236612291-51d87f69-6dc1-4a23-bf4d-1ca1754e0a35.png)

   5. Now extract all the info and add it to your DATABASE_URL. The url would look something like this
      `postgresql://postgres:postgres@localhost:5432/Your-DB-Name`. The port is configurable and does not have to be 5432.

   </details>

   If you don't want to create a local DB. Then you can also consider using services like railway.app or render.

   - [Setup postgres DB with railway.app](https://docs.railway.app/guides/postgresql)
   - [Setup postgres DB with render](https://render.com/docs/databases)
   -[Setup postgres DB with neon.tech](https://neon.tech)

1. Copy and paste your `DATABASE_URL` to `.env`.

1. Set up the database using the Prisma schema (found in `packages/prisma/schema.prisma`)

   In a development environment, run:

   ```sh
   npx prisma migrate
   ```

   In a production environment, run:

   ```sh
   npx prisma deploy
   ```

   ```

1. Run (in development mode)

   ```sh
   npm run dev
   ```

#### Setting up your first user

##### Approach 1

1. Open [Prisma Studio](https://prisma.io/studio) to look at or modify the database content:

   ```sh
   yarn db-studio
   ```

1. Click on the `User` model to add a new user record.
1. Fill out the fields `email`, `username`, `password`, and set `metadata` to empty `{}` (remembering to encrypt your password with [BCrypt](https://bcrypt-generator.com/)) and click `Save 1 Record` to create your first user.
   > New users are set on a `TRIAL` plan by default. You might want to adjust this behavior to your needs in the `packages/prisma/schema.prisma` file.
1. Open a browser to [http://localhost:3000](http://localhost:3000) and login with your just created, first user.




### Upgrading from earlier versions

1. Pull the current version:

   ```sh
   git pull
   ```

1. Check if dependencies got added/updated/removed

   ```sh
   npm install
   ```

1. Apply database migrations by running <b>one of</b> the following commands:

   In a development environment, run:

   ```sh
   npx prisma migrate
   ```

   (This can clear your development database in some cases)

   In a production environment, run:

   ```sh
   npx prisma deploy
   ```

1. Check for `.env` variables changes

   ```sh
   npm predev
   ```

1. Start the server. In a development environment, just do:

   ```sh
   npm run dev
   ```

   For a production build, run for example:

   ```sh
   npm build
   npm start
   ```

1. Enjoy the new version.
<!-- DEPLOYMENT -->

## Deployment
### Vercel

you can use vercel to deploy this application. make sure to add the environment variables in the vercel dashboard.

[![Deploy with Vercel](https://vercel.com/?ref=course-sync.vercel.app)]


<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

Special thanks to these amazing projects which help power CourseSync:

- [Vercel](https://vercel.com/)
- [Next.js](https://nextjs.org/)
- [Shadcn-ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)
