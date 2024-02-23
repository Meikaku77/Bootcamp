# Instalacion REACT NATIVE

- Debo tener instalado node >= v16
- Instalo micorosft-openjdk11
- Instalo AndroidStudio
    - en More Actions voy a SDK Manager
    - con lo que viene configurado por defecto, según la documentación, está bien
    - añado la última versión de Android (v14)
- Debo configurar la variable de entorno Panel de Control/User Account/User Account/Environment variables
    - Nombre: ANDROID_HOME    value: C:\Users\castd\AppData\Local\Android\Sdk
- En la power shell copiar Get-ChildItem-Path Env:\ para verificar que ANDROID_HOME fue agregada
- Hay que configurar otra variable de entorno, esta vez en Path
    - C:\Users\castd\AppData\Local\Android\Sdk\platform-tools
- Para generar una aplicación nos aseguramos de desinstalar versiones anteriores de react-native-cli

> npm uninstall -g react-native-cli @react-native-community/cli

- Debo crear un dispositivo en Android Studio (con la última imagen de Android que tenga)
    - pongo 4G de RAM y 4G de almacenamiento
- Para crear un proyecto

> npx react-native@latest init MyProject

- Entro en la carpeta del proyecto y ejecuto **npx react-native doctor**
- Le doy a f

> npx react-native start

- Pulso a (de android)
- **NOTA**: Me pide Java 17 para correr. Lo seteo en Android Studio en Settings/Build,Execute,.../.../Gradle (selecciono el Java 17 detectado)
    - indico en gradle.properties la ruta donde esta el jdk-17
~~~
org.gradle.java.home=C:\\Program Files\\Java\\jdk-17
~~~
