# app


## Instalar Android studio 

https://docs.expo.dev/workflow/android-studio-emulator/

## Levantar el emulador

Una vez configurado el paso previo no es necesario correr el Android Studio para el desarrollo. Ya estarmeos con el SDK y emuladores instalados

Para ver los emuladores disponibles desde la terminal 

> emulator -list-avds

Para ejecutarlo

> emulator -avd {NAME_DEVICE}

## Correr la aplicacion

Para la primera vez sera necesario correr npm install para la instalacion de las dependencias

> npm install

Luego podemos correr desde el directorio del proyecto 

> npx expo start

Y la aplicacion se vera instalada en el emulaodr (es necesario que el emulador ya se encuentre corriendo)