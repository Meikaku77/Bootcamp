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
    
    static fromJson = (json: string): LogEntity =>{
        const {message, level, createdAt}= JSON.parse(json) //parseo el string del archivo .log a formato JSON
        if(!message) throw new Error("message is required") //validaciones
        if(!level) throw new Error("message is required")
 
        const log = new LogEntity(message, level) //genero la instancia con la data de la desestructuración
        log.createdAt = new Date(createdAt) //le paso la data del log
        return log
     }
}