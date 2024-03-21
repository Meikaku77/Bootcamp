import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repository/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)


export class Server {

    public static start(){
        //CronService.createJob('*/5 * * * * *', ()=>{
            
          //  new CheckService(
            //    fileSystemRepository,
            //    ()=> console.log("Success!"),
            //    (error)=> console.log(`${error}`)
            //).execute('https://google.es')
        // })

        const emailService = new EmailService()

        emailService.sendEmail({
            to:'bercast81@gmail.com',
            subject: 'Logs de sistema',
            htmlBody:`
            <h3>Logs de sistema</h3>
            <p>Este es un mail para los logs de sistema</p>`
        })
    }
}
