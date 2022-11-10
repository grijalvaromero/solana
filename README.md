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
node --version
npm --version
yarn --version
rustc --version
cargo --version
solana --version
```
## Nos conectamos al DevNet y generamos nuestra clave
``` 
solana config set --url https://api.devnet.solana.com
solana-keygen new --force
```
 
## Verificar cuanto dinero tenemos
``` 
solana balance
```

## Cargar dinero a nuestro wallet
``` 
solana airdrop 1
```
## Instalamos las dependencias
``` 
npm install
```

## Lanzamos nuestro SmartContract a la red Solana

``` 
npm run build:program-rust 
solana program deploy dist/program/helloworld.so
```
Con esto se genera el lib, el .so y el hash del programa

### Para verificar que nuestro programa se haya subido a la red solana
Entramos a Solana Explorer: https://explorer.solana.com/

##Interacción con el cliente
primero instalamos las dependencias dentro de client

``` 
npm run start 
```
# Anchor
Instrucciones para utilizar el Framework Anchor

## Crear un proyecto de Anchor

``` 
anchor init nombreproyecto
```
### Configurar el proyecto para utilizar la devnet modificando el archivos anchor.toml 

```
[programs.localnet]
por 
[programs.devnet]

[provider]
cluster = "devnet"

```
### Nos cambiamos a la dev net para poder publicar el proyecto ahí
``` 
solana config set --url devnet
```

### Crearnos una billetera para hacer el deploy del proyecto 
``` 
solana-keygen new --force
```
### Cargamos fondos a nuestra billetera para poder publicar (mínimo 4 sol)
``` 
solana airdrop 2 nuestro_hash --url devnet
```
### Compilamos nuestro proyecto
``` 
sudo anchor build
```

### Copiamos la ruta del keypar.json y la pegamos para obtener el id del programa
``` 
sudo solana address -k /la/ruta/del/json.json
```
No olvidar pegar la ruta del programa en el anchor.toml y en el lib.rs

### Compilamos nuestro proyecto pero ahora con el hash del proyecto
``` 
sudo anchor build
```

### Lo subimos a la red solana
``` 
sudo anchor build
```

# Front End con Vuew
### Instalamos el vue-cli
``` 
sudo npm install -g @vue/cli
```

### Dentro de la carpeta frontend instalamos las dependencias 
``` 
npm install
```
No olvidar copiar el idl generado

### Correr el proyecto de ejemplo
``` 
npm run serve
```