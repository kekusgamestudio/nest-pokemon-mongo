<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
$ yarn install
```
3. Tener nest cli instalado
```
$ npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
$ docker-compose up -d
```
5. Clonar archivo __.env.template__ y renombrar como __.env__

6. Llenar las variables de entorno definidas en __.env__

7. Ejecutar el sistema en modo desarrollo
```
$ yarn start:dev
```
8. Ejecutar el siguiente curl para llenar la db con datos de prueba
```
$ curl --location 'localhost:3000/api/v2/seed'
```


## Stack utilizado
* MongoDB
* Nest
* Docker

