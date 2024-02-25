# NODE_TS NOC - Patrón Repositorio

## Introducción

- **Data Source** es el origen de los datos
- Vamos a empezar a trabajar con el filesystem. Vamos a grabar logs en  él
- Pero va a dar igual si es en el filesystem, en una DB...
- El objetivo es hacer una app en la que esto no importe, o que sea intercambiable sin dolor
- Aplicando **el patrón repositorio**, voy a crear un repositorio que se conecta al data-source, y mi caso de uso llamará al repositorio.
- De esta manera si necesito cambiar de Data source no hay problema, e implica una capa de seguridad
----

## LogEntity

- Toda la lógica de negocio está en el **domain**
- Creo en domain la carpeta entities con log.entity.ts
- Otros ejemplos serían client.entity, product.entity...
- Con esto podré crear instancias de LogEntity

~~~js
export enum LogSeverityLevel{
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}


export class LogEntity{
    
    public level: LogSeverityLevel 
    public message: string
    public createdAt: Date

    constructor(message: string, level: LogSeverityLevel){
        this.message = message
        this.level = level
        this.createdAt = new Date()
    }
}
~~~
----

## Datasources y Repositorios Abstractos

- Creo la carpeta **datasources** y **repository** en domain
- Es el origen de los datos, una DB, filesystem...
- repository es desde dónde vamos a llamar al datasource
- En el domain solo son las reglas, en domain **no hacemos la implementación**
- Creo datasource/log.datasource.ts
- Utilizo una clase abstracta
- Las clases abstractas **no pueden ser instanciadas**
- Sirve para obligar el comportamiento que quiero definir en este datasource sobre otras clases

~~~js
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource{
    
    //cualquier origen de datos va a tener que implementar saveLog
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}
~~~

- Esta es básicamente la implementación de nuestras **reglas de negocio para los datasources**
- Es un contrato el cual **todos mis datasources tienen que cumplirlo**
- En el repository copio el código y le cambio el nombre

~~~js
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository{
    
    //Me permite llamar métodos que hay en el datasource
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}
~~~
----

## FileSystem - Datasource

- Creo la carpeta src/**infraestructure**/**datasources**
- Hay gente que le pone otros nombres.
- De esta manera estan en orden:  domain (reglas de negocio), infraestructura y presentacion 
- Presentación va a llamar cosas de infraestructura e infraestructura va a seguir las reglas de domain
- En la carpeta datasources tengo **el código que yo me comprometí a cumplir en log.datasource**
- Creo el archivo file-system.datasource.ts
- Una vez escrita la clase, implemento LogDatasource.
## NOTA: Con **Ctrl+ .** sobre el nombre de la clase me da la opción de implementar los métodos automáticamente

~~~js
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource{

    private readonly logPath = 'logs/' //mis logs se grabarán en este PATH

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
}
~~~

- Almacenaré los logs según el nivel de severidad
- Necesitamos tener creados los directorios para guardar los logs para que no de error
- **Llamo al método en el constructor** para que al generar una instancia compruebe si existe el directorio logs y si no lo crée
- También quiero crear los archivos en caso de que no existan
- Puedo crear **un arreglo** con los paths de los archivos, y con un **forEach** usar **fs.writeFileSync** para crearlos en caso de que no existan
- Inserto **un string vacío**

~~~js
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDatasource implements LogDataSource{

    private readonly logPath = 'logs/' //mis logs se grabarán en este PATH
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

  
    constructor(){
        this.createLogsFiles() //cuando se genere una instancia llamaremos al método para que verifique si existe logs/ y si no existe lo crée
    }

    //es private porque no quiero que se use fuera de este Datasource
    private createLogsFiles =()=>{
        
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath

        ].forEach(path =>{
            if(fs.existsSync(path)) return
               fs.writeFileSync(path, '') //si no existe creo el archivo y le inserto un string vacío
        })
    }

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
}
~~~

- Hacer esto con la db es mucho más fácil!!
--------

## FileSystem - SaveLog

- Usaré el método saveLog para guardar según la severidad
- Todos los logs los grabaré en allLogsPath, y luego también separaré por medium y high
- **appendFileSync añade una linea al final**
- **JSON.stringify** serializa un objeto como un JSON (le pone comillas dobles, dos puntos entre propiedad y propiedad)
- Coloco un  return Promise.resolve() para acabar con la instrucción y no de error (salta error si coloco solo un return)

~~~js
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDatasource implements LogDataSource{

    private readonly logPath = 'logs/' //mis logs se grabarán en este PATH
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

  
    constructor(){
        this.createLogsFiles() //cuando se genere una instancia llamaremos al método para que verifique si existe logs/ y si no existe lo crée
    }

    //es private porque no quiero que se use fuera de este Datasource
    private createLogsFiles =()=>{
        
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path =>{
            if(fs.existsSync(path)) return
               fs.writeFileSync(path, '') //si no existe creo el archivo y le inserto un string vacío
        })
    }

    saveLog(newLog: LogEntity): Promise<void> {

        fs.appendFileSync(this.allLogsPath, `${JSON.stringify(newLog)}\n`)

        if(newLog.level === LogSeverityLevel.low) return Promise.resolve()
        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, `${JSON.stringify(newLog)}\n`)
        }else{
            fs.appendFileSync(this.highLogsPath, `${JSON.stringify(newLog)}\n`)            
        }
        return Promise.resolve()
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}
~~~

- Para no repetir JSON.stringify(newLog) tantas veces puedo guardarlo en una variable

~~~js
const logAsJson = `${JSON.stringify(newLog)}\n`    
~~~
----

## getLogs

- saveLog está guardando los logs en un archivo .log (no JSON)
- luce algo así

~~~js
{"level": "medium", "message": "hola mundo", "createdAt": "21746TZ6546874145"}
{"level": "medium", "message": "hola mundo", "createdAt": "21746TZ6546874145"}
{"level": "medium", "message": "hola mundo", "createdAt": "21746TZ6546874145"}
{"level": "medium", "message": "hola mundo", "createdAt": "21746TZ6546874145"}
~~~

- Yo necesito regresar un arreglo de LogEntity
- Estos objetos no son lo mismo que un LogEntity, puede que yo tenga un método en LogEntity.
- Este objeto no los va a tener
- Tenemos que transformar este objeto {"level": "medium", "message": "hola mundo", "createdAt": "21746TZ6546874145"} en una entidad
- Voy a crear un switch para filtrar según severidad
- Creo una función para obtener los logs del archivo

~~~js
 private getLogsFromFile =(path: string): LogEntity[]=>{
        const content = fs.readFileSync(path, 'utf-8') 
        


   }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
       
        switch (severityLevel) {
            case LogSeverityLevel.low:
                
                break;
            case LogSeverityLevel.medium:

                break;

            case LogSeverityLevel.high:

                break;
        
            default:

            throw new Error(`${severityLevel} not implemented`)
                break;
        }
    }
~~~

- Creo un método **static porque no quiero crear una instancia para poderlo llamar**
- Podríamos verlo como un **Factory Constructor** en log.entity

~~~js
static fromJson = (json: string): LogEntity =>{
    const {message, level, createdAt}= JSON.parse(json) //parseo el string del archivo .log a formato JSON
    if(!message) throw new Error("message is required") //validaciones
    if(!level) throw new Error("message is required")

    const log = new LogEntity(message, level) //genero la instancia con la data de la desestructuración
    log.createdAt = new Date(createdAt) //le paso la data del log
    return log
}
~~~

- Para barrer el archivo por lineas desde getLogsFromFile, podemos usar el split y pasarle la separación (\n)
- Luego usar un map para que convierta cada elemento en una entidad **con el método estático formJson**
- **En JS cuando tenemos el mismo argumento como mismo parámetro de la función se puede poner solo la declaración de la función (sin paréntesis)**
- No necesito hacer una nueva instancia ya que es un método estático 
  - Es decir, en lugar de **.map(arg=> LogEntity.fromJson(arg)) se puede escribir .map(LogEntity.fromJson)**

~~~js
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDatasource implements LogDataSource{

    private readonly logPath = 'logs/' //mis logs se grabarán en este PATH
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

  
    constructor(){
        this.createLogsFiles() //cuando se genere una instancia llamaremos al método para que verifique si existe logs/ y si no existe lo crée
    }


    //es private porque no quiero que se use fuera de este Datasource
    private createLogsFiles =()=>{
        
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path =>{
            if(fs.existsSync(path)) return
               fs.writeFileSync(path, '') //si no existe creo el archivo y le inserto un string vacío
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`
        fs.appendFileSync(this.allLogsPath, logAsJson)

        if(newLog.level === LogSeverityLevel.low) return 
        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, logAsJson)
        }else{
            fs.appendFileSync(this.highLogsPath, logAsJson)            
        }
        return 
    }
    

   private getLogsFromFile = (path: string): LogEntity[]=>{
        const content = fs.readFileSync(path, 'utf-8') 
        const logs = content.split('\n').map(LogEntity.fromJson)

        return logs
   }
   
   async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
       
        switch (severityLevel) {
            case LogSeverityLevel.low:
                
            return this.getLogsFromFile(this.allLogsPath)
                
            case LogSeverityLevel.medium:
                
            return this.getLogsFromFile(this.mediumLogsPath)

            case LogSeverityLevel.high:
            
            return this.getLogsFromFile(this.highLogsPath)
                    
            default:

            throw new Error(`${severityLevel} not implemented`)
            
        }
    }
}
~~~
-----

## LogRepository Implementation

- Nuestra clase abstracta LogRepository debe tener los métodos saveLog y getLogs
- Se llaman igual que los de nuestro Datasource porque el repositorio va a llamar al DataSource
- Creo la carpeta infraestructure/**repository** con LogRepository.ts
- Implementa la clase abstracta LogRepository. **Con Ctrl + . autocompleta los métodos** 
- Inyecto el Datasource en el constructor de la forma abreviada con **private readonly**
- Lo uso para llamar a los métodos y le paso el log a saveLog y el severityLevel a getLogs

~~~js
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDataSource: LogDataSource
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        return await this.logDataSource.saveLog(log)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return await this.logDataSource.getLogs(severityLevel)
    }

}
~~~
------

## Inyectar repositorio en caso de uso

- Voy al CheckService. Inyecto el repositorio
- Si todo sale bien puedo guardar con logRepository.saveLog
- Necesito guardar una nueva instancia de LogEntity

~~~js
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceUseCase{
    execute(url: string):Promise <boolean>
}

type SuccessCallback = ()=> void  //tipo de lo que quiero ejecutar si todo sale bien
type ErrorCallback = (error: string)=> void //tipo si hay algún error

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
        ){}
    
    
    async execute(url: string): Promise <boolean>{

        try {
            const req = await fetch(url) 
            
            if(!req.ok){
                throw new Error(`Error on check service ${url}`)
            }   
            
            //Si ha ido bien puedo guardar el log con LogRepository

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low )
            this.logRepository.saveLog(log)
            this.successCallback() //llamo al SuccessCallback si todo sale bien
            
            
            return true
            
        } catch (error) {
            
            const errorMessage = `${error}`
            const log = new LogEntity(errorMessage, LogSeverityLevel.low )
            
            this.logRepository.saveLog(log)
            this.errorCallback(errorMessage) //llamo al ErrorCallback
            
            return false
        }

    }
}
~~~
------

- Falta la inyección de la dependencia en server.ts en la nueva instancia de CheckService
- En el server necesito crear la nueva instancia que van a usar todos los servicios
- Creo una nueva instancia de LogRepositoryImpl fuera del server y le paso el fileSystemDataSource
- Se lo paso a la nueva instancia de CheckService

~~~js
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repository/log.repository";
import { CronService } from "./cron/cron-service";


const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)


export class Server {

    public static start(){
        CronService.createJob('*/5 * * * * *', ()=>{
            
            new CheckService(
                fileSystemRepository,
                ()=> console.log("Success!"),
                (error)=> console.log(`${error}`)
            ).execute('https://google.es')
        })
    }
}
~~~

- 