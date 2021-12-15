# Node.js code challenge

The only implemented API endpoint is the health check endpoint.

## Run with docker

Requirements

- Docker 19.03.0+ (https://docs.docker.com/engine/install/)
- Docker Compose 1.27.0+ (https://docs.docker.com/compose/install/)

Start commands
```bash
cp .env.example .env
# Change the POSTGRES_PASSWORD in the .env file
docker-compose up -d
```

After the `docker-compose up -d` command finishes, the server should be available on `http://127.0.0.1:13000/`.
The postgres database should be running on port `45432`.

The only implemented API endpoint is the health check endpoint. It should be available at `http://127.0.0.1:13000/health`.

All the ports listed in the `.env` file are internal to the docker containers.
If you want to change the external ports, please modify the `docker-compose.yml` file accordingly.

Stop command
```bash
docker-compose down
```

Enter the container command shell
```bash
docker exec -it <container name or id> /bin/sh
```

List the node processes running in the container (command needs to be run inside the container)
```bash
pm2 list
```

View the application logs with
```bash
pm2 logs 0
```

If for some reason you will need to rebuild the container, use the following command:
```bash
docker-compose build --no-cache
```

## Development

System used for development

- OS: Ubuntu 20.04
- Node.js: v16.13.1 (https://nodejs.org/en/)
- Visual Studio Code (https://code.visualstudio.com/)

Setup
```bash
npm install # Install the NPM packages
cp .env.example .env
# Change the POSTGRES_PASSWORD in the .env file
# Change the POSTGRES_HOST in the .env file to 127.0.0.1
# Change the POSTGRES_PORT in the .env file to 15432
```

Start only the database container
```bash
docker-compose -f docker-compose.db.yml up -d
```

The `POSTGRES_PORT` port in the `.env` file is internal to the docker container.
If you want to change the external database port, please modify the `docker-compose.db.yml` file accordingly.

Start the application with the following commands
```bash
npm run build
npm start
```

or debug the application with the help of the VS Code launch system (https://code.visualstudio.com/docs/editor/debugging).
The launch commands are specified in the `.vscode/launch.json` file.

The only implemented API endpoint is the health check endpoint. It should be available at `http://127.0.0.1:3000/health`.

Stop the database container when it is not needed anymore
```bash
docker-compose -f docker-compose.db.yml down
```

## Database migrations

[Knex.js](https://knexjs.org/) library is used for the database migrations.
You can also install knex globally with the `npm install knex -g` command (but this is not required).
Here are some basic Knex.js CLI commands:

```bash
npm run knex migrate:make [migration_name] # Create a new migration file.
npm run knex migrate:latest # Migrate the database to the latest version.
npm run knex migrate:rollback # Rollback the last batch of migrations.
```

## Database seeds

[Knex.js](https://knexjs.org/) library is used for the database seeds.
You can also install knex globally with the `npm install knex -g` command (but this is not required).
Here are some basic Knex.js CLI commands:

```bash
npm run knex seed:make [migration_name] # Create a new seed file.
npm run knex seed:run # Run the seeds.
```

## Used HTTP response status codes

- 200 - OK,
- 400 - Bad Request (The error message of this response should be displayed to the user),
- 401 - Unauthorized (User is not logged in and should be redirected to the login page),
- 403 - Forbidden (User does not have the permission to perform this action - the error message of this response or a hardcoded message should be displayed to the user),
- 404 - Not Found,
- 413 - Payload Too Large (uploaded file is too large),
- 500 - Internal server error.
