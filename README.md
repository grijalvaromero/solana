# solana
Solana Hachakthon Tutorial

## Repositorio de inicio
Clonar el repositorio 
``` 
git clone https://github.com/solana-labs/example-helloworld 

```
Las instrucciones de como correrlo estan aquí
``` 
https://github.com/solana-labs/example-helloworld
```
## Verificar todas las dependencias instaladas

``` 
$ node --version
$ npm --version
$ yarn --version
$ rustc --version
$ cargo --version
$ solana --version
```
## Nos conectamos al DevNet y generamos nuestra clave
``` 
$ solana config set --url https://api.devnet.solana.com
$ solana-keygen new --force
```
 
## Verificar cuanto dinero tenemos
``` 
$ solana balance
```

## Cargar dinero a nuestro wallet
``` 
$ solana airdrop 1
```
## Instalamos las dependencias
``` 
$ npm install
```

## Lanzamos nuestro SmartContract a la red Solana

``` 
$ npm run build:program-rust 
$ solana program deploy dist/program/helloworld.so
```
Con esto se genera el lib, el .so y el hash del programa

### Para verificar que nuestro programa se haya subido a la red solana
Entramos a Solana Explorer: https://explorer.solana.com/

##Interacción con el cliente
primero instalamos las dependencias dentro de client

``` 
$ npm run start 


```

