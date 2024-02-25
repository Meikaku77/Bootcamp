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
