

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install o yarn
```

3. levantar la base de datos
```
docker-compose up -d
```

4. levantar servidor
```
yarn dev
```

5. Reconstruir la base de datos con la semilla
```
node seed.js
```

## Stack usado
* MongoDB
* Express