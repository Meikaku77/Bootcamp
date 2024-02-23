interface CheckServiceUseCase{
    execute(url: string):Promise <boolean>
}

type SuccessCallback = ()=> void  //tipo de lo que quiero ejecutar si todo sale bien
type ErrorCallback = (error: string)=> void //tipo si hay algún error

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
        ){}
    
    
    async execute(url: string): Promise <boolean>{

        try {
            const req = await fetch(url) 
            
            if(!req.ok){
                throw new Error(`Error on check service ${url}`)
            }   
            
            this.successCallback() //llamo al SuccessCallback
          
            
            return true
        
        } catch (error) {
    
            this.errorCallback(`${error}`) //llamo al ErrorCallback
            
            return false
        }

    }
}