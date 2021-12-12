# Node.js code challenge

Node.js code challenge

```bash
cp .env.example .env
```

After that change the postgres password `POSTGRES_PASSWORD`.

```bash
docker-compose -f docker-compose.db.yml up -d
```



When you run docker-compose up it reads the overrides automatically.

```bash
docker-compose up
```

To deploy with this production Compose file you can run

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

This deploys all three services using the configuration in `docker-compose.yml` and `docker-compose.prod.yml`
(but not the dev configuration in `docker-compose.override.yml`).

TODO: explain how to setup the app for local development - VS code debugging and so on ...
TODO: test in VM
