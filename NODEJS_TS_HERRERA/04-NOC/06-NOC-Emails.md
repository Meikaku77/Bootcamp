# NODE_TS NOC - EMAILS

- Comento el CronService en el Server para evitar que haga mucho ruido durante el ejercicio
- Refactoricemos
- Hay cosas dolorosas, como cuando una entidad cambia
- Hay una forma de prepararse para ello
- Creo una nueva propiedad origin en LogEntity
- Necesito especificar el origen en el constructor. Puede ser el UseCase o el Service, por ejemplo
- Quiero que en mis logs aparezca en que archivo fue que yo llamé ese log (en un caso de uso, el servicio, etc)
- Si en el futuro necesitara añadir otra propiedad debería volver a cambiar el constructor yarreglar todos los inconvenientes generados en cascada
- Una solución es crear una Factory Function que reciba los argumentos que se esperan para generar una nueva instancia de la entidad
- Por ahora solo será añadir origin al constructor
- Según el Clean Code, cuando tienes 3 argumentos en un método es mejor mandar un objeto
- Creo una interfaz para tipar el objeto que mandaré en el constructor
    - createAt lo hago opcional, porque si no lo recibo lo voy a establecer
- Desestructuro de options las propiedades. Si no viene el createdAt va a ser igual a new Date
- Cuando creo la instancia en el método estatico fromJSON me da error porque recibe dos argumentos y se esperaba uno (el objeto options)
- En origin coloco el origin desestructurado, pero aquí iría el string 'log.entity'

~~~js
export enum LogSeverityLevel{
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

export interface LogEntityOptions{
     level: LogSeverityLevel 
     message: string
     createdAt?: Date
     origin: string
}


export class LogEntity{
    
   
    public level: LogSeverityLevel 
    public message: string
    public createdAt: Date
    public origin: string

    constructor(options: LogEntityOptions){
        const {message, level, createdAt = new Date(), origin}= options

        this.message = message
        this.level = level
        this.createdAt = new Date()
        this.origin = origin
    }
    
    static fromJson = (json: string): LogEntity =>{
        const {message, level, createdAt}= JSON.parse(json) 
        if(!message) throw new Error("message is required") 
        if(!level) throw new Error("message is required")
 
        const log = new LogEntity({    //le paso las propiedades al constructor en un objeto
            message: message, 
            level: level, 
            createdAt: createdAt,
            origin: origin
        }) 
   
        return log
     }
}
~~~

- Esto va a generar una serie de errores en todos los lugares dónde usamos LogEntity. 
- En este caso es solo en el caso de uso
- Debo pasarle el objeto a las nuevas instancias de LogEntity
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

            const log = new LogEntity({
                message:`Service ${url} working`, 
            level: LogSeverityLevel.low,
        origin: 'check-service.ts' })
            this.logRepository.saveLog(log)
            this.successCallback() //llamo al SuccessCallback si todo sale bien
            
            
            return true
            
        } catch (error) {
            
            const errorMessage = `${error}`
            const log = new LogEntity({  //debo pasarle el objeto a la instancia de LogEntity
                message:errorMessage, 
                level: LogSeverityLevel.low,
                origin: ' check.service.ts' })
            
            this.logRepository.saveLog(log)
            this.errorCallback(errorMessage) //llamo al ErrorCallback
            
            return false
        }

    }
}
~~~

- Podemos crear una variable para no poner el string en duro 
- Es más facil mandar estos objetos y luego usar desestructuración para refactorizar, especialmente con más de tres argumentos
-----

## Preparación de envío de correos

- En lugar de usar mailtrap o similares usaremos la propia cuenta de gmail
- Hay que hacer unas configuraciones en la política de contraseñas y las politicas de seguridad de gmail
- Ocupamos un secret_key que google nos va a dar
- Gmail Keys
    - Hay que habilitar el key y el two factor auth
    - En myAccount/seguridad/verificacion en dos pasos (hay que tener activada la verificación en dos pasos)/contraseña de aplicaciones
    - Selecciono correo y le pongo de nombre NOC
    - Copio el código en .env en MAILER_SECRET_KEY
-----

## NodeMailer

- Instalo nodemailer
- 